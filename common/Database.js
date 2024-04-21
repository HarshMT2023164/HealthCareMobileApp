import * as SQLite from 'expo-sqlite';

let databaseInstance = null; // Singleton instance variable

export const getDatabaseInstance = () => {
  if (!databaseInstance) {
    databaseInstance = SQLite.openDatabase('FhwApp4.db');
    setupDatabase(); // Initialize tables if the instance is newly created
  }
  return databaseInstance;
};

// Initialize database tables
export const setupDatabase = () => {
  const db = getDatabaseInstance();

  // Define table creation queries with proper error handling
  const tableQueries = [
    `
    CREATE TABLE IF NOT EXISTS PatientData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      gender TEXT,
      address TEXT,
      pincode INTEGER,
      state TEXT,
      district TEXT,
      abhaID TEXT
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      abhaId TEXT,
      responses TEXT,
      score INTEGER
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Questionnaire (
      id INTEGER PRIMARY KEY,
      name TEXT,
      questions TEXT
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS DoctorsTable (
      id INTEGER PRIMARY KEY,
      name TEXT,
      licenseId TEXT,
      age INTEGER,
      gender TEXT,
      specialty TEXT,
      phoneNum INTEGER,
      email TEXT,
      username TEXT,
      password TEXT,
      active BOOLEAN,
      district TEXT -- Store district as JSON string
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS DoctorAssignment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      abhaId TEXT,
      doctorUsername TEXT
    );
    `
  ];

  db.transaction((tx) => {
    tableQueries.forEach((query) => {
      tx.executeSql(
        query,
        [],
        () => {}, // Success callback (no need to log success for each table)
        (error) => console.error('Error initializing database:', error)
      );
    });
  });
};

// Generic function for inserting data into a table
const insertDataIntoTable = (tableName, dataObject, successMessage) => {
  const db = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        const columns = Object.keys(dataObject).join(',');
        const placeholders = Object.keys(dataObject).fill('?').join(',');
        const values = Object.values(dataObject);

        tx.executeSql(
          `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`,
          values,
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(successMessage);
              resolve(successMessage);
            } else {
              const errorMsg = `Failed to insert data into ${tableName}`;
              console.log(errorMsg);
              reject(new Error(errorMsg));
              return true; // Rollback transaction
            }
          },
          (_, error) => {
            console.error(`Error inserting data into ${tableName}:`, error);
            reject(error);
            return true; // Rollback transaction
          }
        );
      },
      (error) => {
        console.error(`Transaction failed: ${error}`);
      }
    );
  });
};

// Insert patient form data into PatientData table
export const insertFormData = (formData) => {
  return insertDataIntoTable(
    'PatientData',
    formData,
    'Form data inserted successfully'
  );
};

// Insert assessment data into Questionnaire table
export const insertQuestionnaireData = (assessmentData) => {
  const assessmentsObj = {
    ...assessmentData,
    questions: JSON.stringify(assessmentData.questions)
  };
  return insertDataIntoTable(
    'Questionnaire',
    assessmentsObj,
    'Quesionnaire data inserted successfully'
  );
};

// Insert responses into Responses table
export const insertResponseToDb = (abhaId, responses , scoreToEnter) => {
  const responseObj = { abhaId, responses: JSON.stringify(responses), score : scoreToEnter };
  return insertDataIntoTable(
    'Responses',
    responseObj,
    'Response inserted successfully'
  );
};

// Insert doctor data into DoctorsTable
export const insertDoctorToDb = (doctor) => {
  const doctorObj = {
    ...doctor,
    active: doctor.active ? 1 : 0,
    district: JSON.stringify(doctor.district)
  };
  return insertDataIntoTable(
    'DoctorsTable',
    doctorObj,
    'Doctor data inserted successfully'
  );
};

// Insert doctor assignment into DoctorAssignment table
export const insertDoctorAssignmentToDb = (data) => {
  return insertDataIntoTable(
    'DoctorAssignment',
    data,
    'Doctor assignment inserted successfully'
  );
};

// Generic function for fetching data from a table
const fetchDataFromTable = (tableName) => {
  const db = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableName};`,
          [],
          (_, { rows }) => {
            const data = [];
            for (let i = 0; i < rows.length; i++) {
              data.push(rows.item(i));
            }
            resolve(data);
          },
          (_, error) => {
            console.error(`Error fetching data from ${tableName}:`, error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Transaction failed: ${error}`);
      }
    );
  });
};

// Fetch all patient form data from PatientData table
export const fetchAllFormData = async () => {
  return fetchDataFromTable('PatientData');
};

// Fetch all responses from Responses table
export const fetchResponsesFromDb = async () => {
  const responses = await fetchDataFromTable('Responses');
  const jsonParsed = responses.map((response) => ({
    ...response,
    responses: JSON.parse(response.responses)
  }));
  const removedIdObj =   jsonParsed.map((item) => {
    const {abhaId, responses ,score} = item;
    return {abhaId , responses, score};
  })
  return removedIdObj;
};

// Fetch all assessment data from Questionnaire table
export const fetchQuestionnaireFromDb = async () => {
  const assessments = await fetchDataFromTable('Questionnaire');
  return assessments.map((ass) => ({
    ...ass,
    questions: JSON.parse(ass.questions)
  }));
};

// Fetch all doctors from DoctorsTable
export const fetchDoctorsFromDb = async () => {
  const doctors = await fetchDataFromTable('DoctorsTable');
  return doctors.map((doctor) => ({
    ...doctor,
    active: doctor.active === 1,
    district: JSON.parse(doctor.district)
  }));
};

// Fetch all doctor assignments from DoctorAssignment table
export const fetchDoctorAssignmentsFromDb = async () => {
  const responses = await fetchDataFromTable('DoctorAssignment');
  const removedIdObj =   responses.map((item) => {
    const {abhaId, doctorUsername} = item;
    return {abhaId, doctorUsername};
  })
  return removedIdObj;
};

// Function to delete all patient form data from PatientData table
export const deleteAllFormData = async () => {
  const db = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM PatientData;`,
          [],
          (_, { rowsAffected }) => {
            console.log(`Deleted ${rowsAffected} rows from PatientData.`);
            resolve(rowsAffected);
          },
          (_, error) => {
            console.error('Error deleting form data:', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Transaction failed: ${error}`);
      }
    );
  });
};

export const deleteAllDataFromTable = (tableName) => {
  const db = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM ${tableName};`,
          [],
          (_, { rowsAffected }) => {
            console.log(`Deleted ${rowsAffected} rows from ${tableName}.`);
            resolve(rowsAffected);
          },
          (_, error) => {
            console.error(`Error deleting data from ${tableName}:`, error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Transaction failed: ${error}`);
      }
    );
  });
};

// Function to delete a table
export const deleteTable = (tableName) => {
  const db = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS ${tableName};`,
          [],
          () => {
            console.log(`Table '${tableName}' deleted successfully`);
            resolve();
          },
          (_, error) => {
            console.error(`Error deleting table '${tableName}':`, error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error(`Transaction failed: ${error}`);
      }
    );
  });
};
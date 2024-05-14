  import * as SQLite from 'expo-sqlite';
  import { TableNames } from './Constants/DBConstants';

  let databaseInstance = null; // Singleton instance variable

  export const getDatabaseInstance = () => {
    if (!databaseInstance) {
      databaseInstance = SQLite.openDatabase('FhwApp11.db');
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
    CREATE TABLE IF NOT EXISTS HospitalTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospital TEXT
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
      `,
      `
      CREATE TABLE IF NOT EXISTS HospitalAssignment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        abhaId TEXT,
        uhid TEXT
      );
      `,

        `CREATE TABLE IF NOT EXISTS FollowUp (
          id INTEGER PRIMARY KEY,
          citizen TEXT, 
          citizenId INTEGER,
          date TEXT,
          instructions TEXT,
          status INTEGER DEFAULT 0,
          doctor TEXT, -- JSON object stored as string
          isLastFollowUp INTEGER DEFAULT 0 -- New column for isLastFollowUp flag (default value is 0)
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS FollowUpInstructions (
          followUpId INTEGER PRIMARY KEY,
          instructions TEXT
        );
        `,

      
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

  export const insertHospitalData = (hospital) => {
    const hospitalObj = { hospital: JSON.stringify(hospital) };
    return insertDataIntoTable(
      'HospitalTable',
      hospitalObj,
      'Hospital data inserted successfully'
    );
  };

  export const insertHospitalAssignmentToDb = (data) => {
    return insertDataIntoTable(
      TableNames.HospitalAssignments,
      data,
      'hospital assignment inserted successfully'
    );
  };

  export const insertFollowUpInstructionData = (instructionData) => {
    console.log(instructionData);
    return insertDataIntoTable(
      TableNames.FollowUpInstructions,
      instructionData,
      'Follow-up instruction inserted successfully'
    );
  };


  export const insertFollowUpData = (followUpData) => {
    const followUpObj = {
      ...followUpData,
      citizen: JSON.stringify(followUpData.citizen), // Convert JSON object to string
      doctor: JSON.stringify(followUpData.doctor), // Convert doctor object to string
      date: followUpData.date, // Convert Date object to ISO string
      isLastFollowUp: followUpData.isLastFollowUp ? 1 : 0,
      status : parseInt(followUpData.status==="Assigned" ? 0 : 1) // Convert boolean to integer for SQLite
    };
    return insertDataIntoTable(
      TableNames.FollowUp,
      followUpObj,
      'Follow-up data inserted successfully'
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

  export const fetchHospitalAssignmentsFromDb = async () => {
    const responses = await fetchDataFromTable(TableNames.HospitalAssignments);
    const removedIdObj =   responses.map((item) => {
      const {abhaId, uhid} = item;
      return {abhaId, uhid};
    })
    return removedIdObj;
  };

  export const fetchAllHospitalsFromDb = async () => {
    const hospitals = await fetchDataFromTable(TableNames.HospitalTable);
    return hospitals.map((hospital) => ({
      id: hospital.id,
      hospital: JSON.parse(hospital.hospital)
    }));
  };

  export const fetchFollowUpData = async () => {
    const followUps = await fetchDataFromTable(TableNames.FollowUp);
    return followUps.map((followUp) => ({
      ...followUp,
      citizen: JSON.parse(followUp.citizen), // Parse JSON string back to object
      doctor: JSON.parse(followUp.doctor), // Parse JSON string back to object
      date: followUp.date, // Convert ISO string to Date object
    }));
  };


  export const fetchFollowUpInstructionData = async () => {
    const instructions = await fetchDataFromTable(TableNames.FollowUpInstructions);
    return instructions.map((instruction) => ({
      ...instruction,
    }));
  };


  export const updateFollowUpById = (followUpId, updatedFollowUpData) => {
    const updatedFollowUpObj = {
      ...updatedFollowUpData,
      citizen: JSON.stringify(updatedFollowUpData.citizen), // Convert citizen object to string
      doctor: JSON.stringify(updatedFollowUpData.doctor), // Convert doctor object to string
      date: updatedFollowUpData.date, // Convert Date object to ISO string
      status: 1, // Assign completed flag (default to 0 if not provided)
      isLastFollowUp: updatedFollowUpData.isLastFollowUp ? 1 : 0 // Convert boolean to integer for SQLite
    };

    const db = getDatabaseInstance();

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE ${TableNames.FollowUp} SET citizen = ?, citizenId = ?, date = ?, instructions = ?, status = ?, doctor = ?,isLastFollowUp = ? WHERE id = ?;`,
            [
              updatedFollowUpObj.citizen,
              updatedFollowUpObj.citizenId,
              updatedFollowUpObj.date,
              updatedFollowUpObj.instructions,
              updatedFollowUpObj.status,
              updatedFollowUpObj.doctor,
              updatedFollowUpObj.isLastFollowUp,
              followUpId
            ],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve(`Follow-up with id ${followUpId} updated successfully.`);
              } else {
                reject(new Error(`Follow-up with id ${followUpId} not found.`));
              }
            },
            (_, error) => {
              console.error(`Error updating follow-up with id ${followUpId}:`, error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error(`Transaction failed: ${error}`);
          reject(error);
        }
      );
    });
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
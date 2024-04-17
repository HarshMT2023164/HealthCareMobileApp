import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('FhwApp.db');

// Initialize database tables
export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
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
      )
      `
    );
  });
};


export const insertFormData = (formData) => {
  const { name, age, gender, address, pincode, state, district, abhaId } = formData;

  db.transaction((tx) => {
    tx.executeSql(
      `
      INSERT INTO PatientData (name, age, gender, address, pincode, state, district, abhaID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [name, age, gender, address, pincode, state, district, abhaId],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('Form data inserted successfully');
        } else {
          console.log('Failed to insert form data');
        }
      },
      (_, error) => {
        console.error('Error inserting form data:', error);
      }
    );
  });
};


export const fetchAllFormData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM PatientData;`,
        [],
        (_, { rows }) => {
          let data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching form data:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteAllFormData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM PatientData;`,
        [],
        (_, { rowsAffected }) => {
          console.log(`Deleted ${rowsAffected} rows.`);
          resolve(rowsAffected);
        },
        (_, error) => {
          console.error('Error deleting form data:', error);
          reject(error);
        }
      );
    });
  });
};

// const handleDeleteAll = async () => {
//   try {
//     const rowsDeleted = await deleteAllFormData();
//     if (rowsDeleted > 0) {
//       Alert.alert('Success', 'All data has been deleted.');
//     } else {
//       Alert.alert('Notice', 'No data to delete.');
//     }
//   } catch (error) {
//     Alert.alert('Error', 'Failed to delete data.');
//     console.error('Delete operation failed:', error);
//   }
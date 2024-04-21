import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Surface, Text } from 'react-native-paper';
import { fetchAllFormData, fetchDoctorsFromDb, fetchResponsesFromDb, insertDoctorAssignmentToDb } from '../common/Database';
import { getFromAsyncStorage } from '../utils/AsyncStorageService';

// const data =[
//   {
//     name:"Dr. Anil Sighaniya",
//     gender:"Male",
//     mobile:9876543210
//   },
//   {
//     name:"Dr. Arjun Gangani",
//     gender:"Male",
//     mobile:990456619
//   },
//   {
//     name:"Dr. Priya Mishra",
//     gender:"Female",
//     mobile:9876543210
//   },
//   {
//     name:"Dr. Anjali Gupta",
//     gender:"Female",
//     mobile:9876541230
//   },
//   {
//     name:"Dr. Vraj Naik",
//     gender:"Male",
//     mobile:1234567892
//   },
// ]



export default function DoctorListScreen() {
  const [doctorList , setDoctorList] = useState([]);

  const fetchRegistrationData = async() => {
    try {
      const data = await fetchAllFormData();
      console.log("Fetched Registration Data:", (data));
  
    
    } catch (error) {
      console.error('Error fetching registration  data:', error);
    }
  };

  



  const fetchDoctors = async() => {
    try {
      const data = await fetchDoctorsFromDb();
      console.log("Fetched Assessment Data:", (data));
  
      if (data && data.length > 0) {
        console.log("before setting data  :" , data);
        setDoctorList(data);
      } else {
        console.warn('error in doctor list format ');
        // Handle invalid data or set default values for questionList
      }
    } catch (error) {
      console.error('Error fetching doctor  data:', error);
    }
  };

  const fetchResponses = async() => {
    try {
      const data = await fetchResponsesFromDb();
  
      if (data) {
        console.log("fetch Questionnaire response data  :" , data);
        
      } else {
        console.warn('error in response list format ');
        // Handle invalid data or set default values for questionList
      }
    } catch (error) {
      console.error('Error fetching response  data:', error);
    }
  };

  


  useEffect(() => {
    //  getDoctorsAsync('doctorList');

    fetchDoctors();
    fetchRegistrationData();
    fetchResponses();
  },[])

  const getDoctorsAsync = async (key) => {
    const json = await getFromAsyncStorage("doctorList");
    setDoctorList(json?.doctorListKey);
  };

  const assignDoctor = async (docUsername) => {
    const abhaId = await getFromAsyncStorage("abhaId");
    console.log(abhaId);
      insertDoctorAssignmentToDb({abhaId : abhaId , doctorUsername : docUsername}).then(() => {
    
        console.log("doctor assignment data inserted successfully");
      }).catch(() => {
        console.log("Error inserting doctor assignment");
      })
  }
 
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Available Doctors</Text>
        </View>
        {doctorList.map((doctor, index) => (
          <Surface key={index} mode='elevated' elevation={4} style={styles.surfaceItem}>
            <View style={styles.surfaceItemContent}>
              <View style={styles.surfaceItemAvatar}>
                <Avatar.Icon icon='doctor' size={50} style={{ backgroundColor: '#f5f5f5', borderColor: 'lightgray', borderWidth: 1 }} />
              </View>
              <View style={styles.surfaceItemDetails}>
                <Text>{doctor?.name}</Text>
                <Text>{doctor?.gender}</Text>
                <Text>{doctor?.email}</Text>
                <Text>{doctor?.licenseId}</Text>
              </View>
            </View>
            <View style={styles.surfaceItemButton}>
              <Button onPress={() => assignDoctor(doctor?.username)} icon='chevron-right' mode='contained' contentStyle={{ flexDirection: 'row-reverse', backgroundColor: '#7b9dbd' }}>Assign</Button>
            </View>
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: '#a7cae7',
    width: '60%',
    height: 50,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20, 
    gap:10,
  },
  surfaceItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, 
    width: '100%', 
    borderRadius: 10, 
    marginBottom: 10,
    elevation: 4,
  },
  surfaceItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surfaceItemAvatar: {
    marginRight: 10,
  },
  surfaceItemButton: {
    marginLeft: 'auto',
  },
});


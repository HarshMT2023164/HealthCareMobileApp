import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Divider, Surface, Text } from 'react-native-paper';

// Constant data for doctors
const doctorData = [
  { id: 1, name: 'Dr. Tanvi Motwani',designation: 'Neurologist at kavery hospital',age:'25', gender: 'Female', phoneNumber: '9855XXXXXX' },
  { id: 2, name: 'Dr. Rahul Singh',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Male', phoneNumber: '9855XXXXXX' },
  { id: 3, name: 'Dr. Priya Patel',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Female', phoneNumber: '9855XXXXXX' },
  { id: 4, name: 'Dr. Amit Kumar',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Male', phoneNumber: '9855XXXXXX' },
  { id: 5, name: 'Dr. Neha Joshi',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Female', phoneNumber: '9855XXXXXX' },
  { id: 6, name: 'Dr. Suresh Yadav',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Male', phoneNumber: '9855XXXXXX' },
  { id: 7, name: 'Dr. Riya Shah',designation: 'Neurologist at kavery hospital', age:'25', gender: 'Female', phoneNumber: '9855XXXXXX' },
  { id: 8, name: 'Dr. Vikram Singh',designation: 'Neurologist at kavery hospital', age:'25', gender: 'Male', phoneNumber: '9855XXXXXX' },
  { id: 9, name: 'Dr. Shreya Verma',designation: 'Neurologist at kavery hospital', age:'25', gender: 'Female', phoneNumber: '9855XXXXXX' },
  { id: 10, name: 'Dr. Aryan Sharma',designation: 'Neurologist at kavery hospital',age:'25',  gender: 'Male', phoneNumber: '9855XXXXXX' },
];

export default function DoctorListScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Available Doctors</Text>
        </View>
        {doctorData.map(doctor => (
          <Surface key={doctor.id} mode='elevated' elevation={4} style={styles.surfaceItem}>
            <View style={styles.surfaceContent}>
              <View style={styles.surfaceItemContent}>
                {/* <View style={styles.surfaceItemAvatar}>
                  <Icon source='stethoscope' size={30} color='#a7cae7' />
                </View> */}
                <Image source={require('../assets/images/hospitalsign.jpg')} style={styles.doctorImage} width={80} resizeMode='contain' />
                <View style={styles.surfaceItemDetails}>
                  
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={{fontSize:11}}>{doctor.designation}</Text>
                  <Divider style={styles.divider} />
                  <Text style={{fontSize: 11}}>{doctor.age} |  {doctor.gender} |  {doctor.phoneNumber}</Text>
                 
                </View>
              </View>
              <View style={styles.surfaceItemButton}>
                <Button icon='chevron-right' contentStyle={styles.buttonContent} textColor='white'>Assign</Button>
              </View>
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
  doctorImage: {
    width:65,
    height: 65,
    marginRight: 55,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 35,
    paddingHorizontal: 10,
    
  },
  surfaceItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
    width: '90%',
  },
  surfaceContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap:10,
    width: '100%',
  },
  surfaceItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:1,
    
  },
  surfaceItemAvatar: {
    marginRight: 20,
    marginTop: 15,
  },
  surfaceItemDetails: {
    flex: 1,
    marginLeft:-50,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    marginVertical: 5,
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  detailsText: {
    
  },
  surfaceItemButton: {
    alignSelf: 'center',
    marginTop: 10,
    width:'90%',
    
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    backgroundColor: '#a7cae7',
    height:40
  },
});

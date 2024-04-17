import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text,Avatar, Surface, Button } from 'react-native-paper';


const data =[
  {
    name:"Dr. Anil Sighaniya",
    gender:"Male",
    mobile:9876543210
  },
  {
    name:"Dr. Arjun Gangani",
    gender:"Male",
    mobile:990456619
  },
  {
    name:"Dr. Priya Mishra",
    gender:"Female",
    mobile:9876543210
  },
  {
    name:"Dr. Anjali Gupta",
    gender:"Female",
    mobile:9876541230
  },
  {
    name:"Dr. Vraj Naik",
    gender:"Male",
    mobile:1234567892
  },
]

export default function DoctorListScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Available Doctors</Text>
        </View>
        {data.map((doctor, index) => (
          <Surface key={index} mode='elevated' elevation={4} style={styles.surfaceItem}>
            <View style={styles.surfaceItemContent}>
              <View style={styles.surfaceItemAvatar}>
                <Avatar.Icon icon='doctor' size={50} style={{ backgroundColor: '#f5f5f5', borderColor: 'lightgray', borderWidth: 1 }} />
              </View>
              <View style={styles.surfaceItemDetails}>
                <Text>{doctor.name}</Text>
                <Text>{doctor.gender}</Text>
                <Text>{doctor.mobile}</Text>
              </View>
            </View>
            <View style={styles.surfaceItemButton}>
              <Button icon='chevron-right' mode='contained' contentStyle={{ flexDirection: 'row-reverse', backgroundColor: '#7b9dbd' }}>Assign</Button>
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


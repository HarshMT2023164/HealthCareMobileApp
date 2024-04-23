import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Surface, Text } from 'react-native-paper';


const data =[
  {
    id:1,
    name:"Tanvi Motwani",
    gender:"Female",
    mobile:9876543210
  },
  {
    id:2,
    name:"Nikita Gupta",
    gender:"Female",
    mobile:990456619
  },
  {
    id:3,
    name:"Vraj Jatin Naik",
    gender:"Male",
    mobile:9876543210
  },
  {
    id:4,
    name:"Arjun Gangani",
    gender:"Male",
    mobile:9876541230
  },
  {
    id:5,
    name:"Parth Sharma",
    gender:"Male",
    mobile:1234567892
  },
  {
    id:6,
    name:"vriddhi Rathore",
    gender:"Female",
    mobile:1234567892
  },
]

export default function FollowUpListScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Follow Up List</Text>
        </View>
        {data.map((citizen, index) => (
          <Surface key={index} mode='elevated' elevation={4} style={styles.surfaceItem}>
            <View style={styles.surfaceItemContent}>
            <View style={styles.surfaceItemDetails}>
                <Text>{citizen.id}.   </Text>
                
              </View>
              <View style={styles.surfaceItemAvatar}>
                <Avatar.Icon icon='account' size={50} style={{ backgroundColor: '#f5f5f5', borderColor: 'lightgray', borderWidth: 1 }} />
              </View>
              <View style={styles.surfaceItemDetails}>
                <Text>{citizen.name}</Text>
                <Text>{citizen.gender}</Text>
                <Text>{citizen.mobile}</Text>
              </View>
            </View>
            <Button icon='check'  style={{flexDirection: 'row-reverse', backgroundColor: 'lightgray',alignContent:'center' }}/>
          
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: '#a7cae7',
    marginTop:30,
    width: '60%',
    height: 50,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 11,
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
});
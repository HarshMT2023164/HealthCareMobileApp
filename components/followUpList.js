import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Button, Chip, Surface, Text } from 'react-native-paper';
import { fetchFollowUpData } from '../common/Database';
import { Askeys, storeInAsyncStorage } from '../utils/AsyncStorageService';
import { useNavigation } from '@react-navigation/native';

export default function FollowUpListScreen() {
  const [followUpList, setFollowUpList] = useState([]);
  const navigation = useNavigation();

  const fetchFollowUps = async () => {
    try {
      const data = await fetchFollowUpData();
      console.log("Fetched followUp Data:", data);

      if (data && data.length > 0) {
        setFollowUpList(data);
      } else {
        console.warn('Error in follow-up list format');
        // Handle invalid data or set default values for followUpList
      }
    } catch (error) {
      console.error('Error fetching follow-up data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFollowUps();
    });

    // Cleanup function
    return unsubscribe;
  }, [navigation]);

  const conductFollowUp = async (followUp) => {
    console.log(followUp);
    await storeInAsyncStorage(Askeys.FOLLOWUP, followUp);
    navigation.push("MedReport");
  };

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Follow Up List</Text>
      </View>
      {followUpList.map((followUp, index) => (
        <Surface onTouchStart={() => conductFollowUp(followUp)} key={index} mode='elevated' elevation={4} style={[styles.surfaceItem , {backgroundColor : followUp.status ? "#F2FFF0" : "#FFF0EF"}]}>
          <View style={styles.surfaceItemContent}>
            <View style={styles.surfaceItemAvatar}>
              <Avatar.Icon icon='account' size={50} style={{ backgroundColor: '#f5f5f5', borderColor: 'lightgray', borderWidth: 1 }} />
            </View>
            <View style={styles.surfaceItemDetails}>
            <Text variant="titleMedium">{followUp?.citizen?.name}</Text>
            <Text variant="bodyLarge">{followUp?.citizen?.abhaId}</Text>
            <Text variant="bodySmall">{followUp?.citizen?.address}</Text>
            <Text variant="bodySmall">{followUp?.citizen?.district}</Text>
            </View>
          </View>
        </Surface>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    width: '60%',
    height: 50,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 50,
    padding: 11,
     borderWidth: 2,
    borderColor: '#bcd9f0',

    
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  surfaceItem: {
    backgroundColor: '#F2FFF0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 40,
    marginBottom: 10,
    elevation: 4,
  },
  surfaceItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "60%"
  },
  surfaceItemAvatar: {
    marginRight: 10,
  },
  chip: {
    marginRight: 8,
    borderRadius : 40,
    width : "40%",
    padding : "auto"
  },
});

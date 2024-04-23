import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { TableNames } from './common/Constants/DBConstants';
import { BASE_URL, FETCH_DOCTORLIST, FETCH_QUESTIONNAIRE } from './common/Constants/URLs';
import { deleteAllDataFromTable, insertDoctorToDb, insertQuestionnaireData, setupDatabase } from './common/Database';
import DoctorListScreen from './components/DoctorListScreen';
import HealthCard2 from './components/HealthCard2';
import Questionnaire from './components/Questionnaire';
import Registration from './components/Registration';
import TabNavigation from './components/TabNavigation';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './components/WelcomeScreen';

import * as LocalAuthentication from 'expo-local-authentication';
import Login from './components/login';
import { Askeys } from './utils/AsyncStorageService';

export default function App() {

  const fetchDoctorsList  = async() => {
     try {
      const token = await AsyncStorage.getItem(Askeys.TOKEN);
        
        const response = await axios.get(`${BASE_URL+FETCH_DOCTORLIST}?username=${"FHW41545"}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        deleteAllDataFromTable(TableNames.DoctorListTable).then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log('All form data deleted successfully');
            // Additional logic after successful deletion
          } else {
            console.log('No form data found to delete');
          }

          response?.data.forEach((doctor) => {
            // console.log(doctor);
            insertDoctorToDb(doctor)
              .then(() => {
                console.log("doctor id: ", doctor);
                console.log(`Doctor '${doctor?.name}' inserted successfully`);
                // Additional logic after successful insertion (if needed)
              })
              .catch((error) => {
                console.error(`Error inserting doctor '${doctor.name}':`, error);
              });
          });

        })
        .catch((error) => {
          console.error('Error deleting form data:', error);
        });  

 
       
      } catch (error) {
        console.log( "ERROR OF THEN 2:", error);
        // setLoading(true); // Set loading to false if there's an error
      }
  }

  const fetchQuestionnaire = async() => {
      try {
        const token = await AsyncStorage.getItem(Askeys.TOKEN)
        const response = await axios.get(`${BASE_URL+FETCH_QUESTIONNAIRE}?id=${2}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        deleteAllDataFromTable(TableNames.QuestionnaireTable).then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log('All questionary data deleted successfully');
            // Additional logic after successful deletion
          } else {
            console.log('No form data found to delete');
          }
          insertQuestionnaireData(response.data).then(() => {
            
            console.log(`Questionnaire data  inserted successfully`);
            // Additional logic after successful insertion (if needed)
          })
          .catch((error) => {
            console.error(`Error inserting doctor '${doctor.name}':`, error);
          });
        })
        .catch((error) => {
          console.error('Error deleting form data:', error);
        });  

        
      } catch (error) {
        console.log(error);
        // setLoading(true); // Set loading to false if there's an error
      }
  }

  const fetchOnAppLoad = () => {
    
    fetchDoctorsList();
    fetchQuestionnaire();
  } 

  const [isConnected , setIsConnected]  = useState("Not connected");

  // useEffect(() => {
  //   const unsubscribeNetInfo = NetInfo.addEventListener(state => {
  //     if (state.isConnected) {
  //       // Network connection is available, trigger data sync
  //       console.log("isconnected");
  //       syncDataWithBackend();
  //       setIsConnected("it is connected") // Call your sync function here
  //     }
  //     else{
  //       console.log("is not connected");
  //       setIsConnected("disconnected");
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe from network state changes when component unmounts
  //     unsubscribeNetInfo();
  //   };
  // },[]);

  useEffect(() => {
    console.log("hello");
    setupDatabase();
    // fetchOnAppLoad();

     // Initialize SQLite database
  }, []);

  useEffect(()=> {
    async function authenticate(){
      const result =await LocalAuthentication.authenticateAsync();
      console.log(result);
    }
    authenticate();
  },[]);

  const Stack = createStackNavigator();

  return (
    <PaperProvider>
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ZENCARE">
        <Stack.Screen
          name='ZENCARE'
          component={WelcomeScreen}
          options={{
            headerShown:false, // Set a custom title
          }}
        />
          <Stack.Screen name="LoginScreen" component={Login} options={{title:''}}/>
          <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown:false}}/>
          <Stack.Screen name="followUpList" component={FollowUpListScreen} options={{headerShown:false}}/>
          <Stack.Screen name="register" component={Registration} options={{headerShown:false}}/>
          <Stack.Screen name="question" component={Questionnaire} options={{headerShown:false}}/>
          <Stack.Screen name="healthCard" component={HealthCard2} options={{headerShown:false}}/>
          <Stack.Screen name="doctorList" component={DoctorListScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </PaperProvider>
    

  // return (
  //   <GestureHandlerRootView>
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="ZENCARE">
  //       <Stack.Screen
  //         name='ZENCARE'
  //         component={WelcomeScreen}
  //         options={{
  //           headerShown:false, // Set a custom title
  //         }}
  //       />
  //       <Stack.Screen name="LoginScreen" component={Login} options={{title:''}}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  //   </GestureHandlerRootView>
  // );
)};



const styles = StyleSheet.create(
  {
    container:
    {
      flex:1,
    }
  }
)

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './components/WelcomeScreen';

import * as LocalAuthentication from 'expo-local-authentication';
import Login from './components/login';

const Stack = createStackNavigator();

export default function App() {
  useEffect(()=> {
    async function authenticate(){
      const result =await LocalAuthentication.authenticateAsync();
      console.log(result);
    }
    authenticate();
  },[]);
  return (
    <GestureHandlerRootView>
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
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Login from './components/login';

const Stack = createStackNavigator();

export default function App() {
  return (
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
  );
}


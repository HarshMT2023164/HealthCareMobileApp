import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HealthCard from './components/HealthCard';
import HealthCard2 from './components/HealthCard2';
import WelcomeScreen from './components/WelcomeScreen';
import Login from './components/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name='ZENCARE'
          component={WelcomeScreen}
          options={{
            headerShown:false, // Set a custom title
          }}
        />
        <Stack.Screen name="HealthCard" component={HealthCard} options={{
            headerShown:false, // Set a custom title
          }}/>
          {/* <Stack.Screen name="HealthCard2" component={() => <HealthCard2 value={90} />} options={{
           headerShown: false, // Set a custom title
          }}
          /> */}
          <Stack.Screen name="HealthCard2" component={HealthCard2} options={{
           headerShown: false, // Set a custom title
          }} />
        <Stack.Screen name="LoginScreen" component={Login} options={{title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './components/WelcomeScreen';

import Login from './components/login';

const Stack = createStackNavigator();

export default function App() {
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


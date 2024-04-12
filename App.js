import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'

import Home from './components/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, IconButton } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' activeColor='#37474F' inactiveColor='#A7CAE7' activeIndicatorStyle={{backgroundColor:'#BBDEFB',}} barStyle={{backgroundColor:'white'}} labeled={false}>
          <Tab.Screen name='Home' component={Home} options={{tabBarIcon:({color})=>(<Icon source='home' size={25} color={color}/>),}}/>
          <Tab.Screen name='Notifications' component={Home} options={{tabBarIcon:({color})=>(<Icon source='bell' size={25} color={color}/>),}}/>
          <Tab.Screen name='Profile' component={Home} options={{tabBarIcon:({color})=>(<Icon source='account-circle' size={25} color={color}/>),}}/>
        </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

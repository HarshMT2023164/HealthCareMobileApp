import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DoctorListScreen from './components/DoctorListScreen';
import Home from './components/Home';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Notifications' activeColor='#37474F' inactiveColor='#A7CAE7' activeIndicatorStyle={{backgroundColor:'#BBDEFB',}} barStyle={{backgroundColor:'white'}} labeled={false}>
            <Tab.Screen name='Home' component={Home} options={{tabBarIcon:({color})=>(<Icon source='home' size={25} color={color}/>),}}/>
            <Tab.Screen name='Notifications' component={DoctorListScreen} options={{tabBarIcon:({color})=>(<Icon source='bell' size={25} color={color}/>),}}/>
            <Tab.Screen name='Profile' component={Home} options={{tabBarIcon:({color})=>(<Icon source='account-circle' size={25} color={color}/>),}}/>
          </Tab.Navigator>
        </NavigationContainer>
     </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Login from './components/login';
import TabNavigation from './components/TabNavigation';
import Registration from './components/Registration';
import Questionnaire from './components/Questionnaire';
import { MD3LightTheme as DefaultTheme,PaperProvider } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';
import HealthCard2 from './components/HealthCard2';
import DoctorListScreen from './components/DoctorListScreen'


export default function App() {

  const Stack = createStackNavigator();

  return (
    <PaperProvider>
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ZENCARE">
          <Stack.Screen name='ZENCARE' component={WelcomeScreen}options={{ headerShown:false}}/>
          <Stack.Screen name="LoginScreen" component={Login} options={{title:''}}/>
          <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown:false}}/>
          <Stack.Screen name="register" component={Registration} options={{headerShown:false}}/>
          <Stack.Screen name="question" component={Questionnaire} options={{headerShown:false}}/>
          <Stack.Screen name="healthCard" component={HealthCard2} options={{headerShown:false}}/>
          <Stack.Screen name="doctorList" component={DoctorListScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MedicalReport from './components/MedicalReport'
import FollowUpScreen from './components/FollowUpScreen';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MedReport'>
      <Stack.Screen name='MedReport' component={MedicalReport} options={{headerShown:false}}/>
      <Stack.Screen name='FollowUpScreen' component={FollowUpScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


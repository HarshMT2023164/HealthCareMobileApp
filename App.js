import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Profile from './components/Profile';

const Stack = createStackNavigator();

function App() {
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

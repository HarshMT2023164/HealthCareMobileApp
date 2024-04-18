import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import FollowUpListScreen from './components/followUpList';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView>
    <PaperProvider>
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="followUpList" component={FollowUpListScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </PaperProvider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create(
  {
    container:
    {
      flex:1,
    }
  }
)
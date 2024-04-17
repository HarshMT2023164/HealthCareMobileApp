import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { setupDatabase } from "./common/Database";
import Questionnaire from "./components/Questionnaire";
import Registration from "./components/Registration";
import { useEffect } from "react";



export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#008cff",
    },
  };
  const Stack = createStackNavigator();
  useEffect(() => {
    setupDatabase();
     // Initialize SQLite database
  }, []);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{headerShown : false,}} initialRouteName="register">
            <Stack.Screen name="register" component={Registration} />
            <Stack.Screen name="question" component={Questionnaire} />
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

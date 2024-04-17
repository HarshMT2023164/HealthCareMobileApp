import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";


const StackWithTabBar = createStackNavigator();

export default function StackNavigationWithTabBar()
{
    return(
        <StackWithTabBar.Navigator>
            <StackWithTabBar.Screen name="Home" component={Home} options={{ headerShown:false}}/>
        </StackWithTabBar.Navigator>
    );
}
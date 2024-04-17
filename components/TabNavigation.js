import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './Home';
import { Icon } from 'react-native-paper';
import StackNavigationWithTabBar from './StackNavigationWithTabBar';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation()
{
    return(
        <Tab.Navigator initialRouteName='StackWithTabBar' activeColor='#37474F' inactiveColor='#A7CAE7' activeIndicatorStyle={{backgroundColor:'#BBDEFB',}} barStyle={{backgroundColor:'white'}} labeled={false}>
            <Tab.Screen name='StackWithTabBar' component={StackNavigationWithTabBar} options={{tabBarIcon:({color})=>(<Icon source='home' size={25} color={color}/>),}}/>
            <Tab.Screen name='Notification' component={Home} options={{tabBarIcon:({color})=>(<Icon source='bell' size={25} color={color}/>),}}/>
            <Tab.Screen name='Profile' component={Home} options={{tabBarIcon:({color})=>(<Icon source='account' size={25} color={color}/>),}}/>
        </Tab.Navigator>
    );
}
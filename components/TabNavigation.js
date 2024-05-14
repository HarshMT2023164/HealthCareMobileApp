import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './Home';
import { Icon } from 'react-native-paper';
import StackNavigationWithTabBar from './StackNavigationWithTabBar';
import { FontAwesome6 } from '@expo/vector-icons';
import FollowUpListScreen from './followUpList';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation()
{
    return(
        <Tab.Navigator initialRouteName='StackWithTabBar' activeColor='#37474F' inactiveColor='#A7CAE7' activeIndicatorStyle={{backgroundColor:'#BBDEFB',}} barStyle={{backgroundColor:'white'}} labeled={false}>
            <Tab.Screen name='StackWithTabBar' component={StackNavigationWithTabBar} options={{tabBarIcon:({color})=>(<Icon source='home' size={25} color={color}/>),}}/>
            <Tab.Screen name='FollowUpList' component={FollowUpListScreen} options={{tabBarIcon:({color})=>(<FontAwesome6 name="clipboard-list" size={22} color={color} />),}}/>
            <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon:({color})=>(<Icon source='account' size={25} color={color}/>),}}/>
        </Tab.Navigator>
    );
}
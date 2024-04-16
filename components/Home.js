import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Appbar, Text, Surface, Card, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
    const [selectedValue, setSelectedValue] = useState("option2");
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); // Update time every minute (60 seconds)
        return () => clearInterval(interval);
    }, []);

    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    ////Dyamic
    return (
        <View style={styles.HomePage}>
            <Appbar.Header style={styles.appbarContainer}>
                <Surface style={styles.appbarItem1}>
                    <Text style={styles.appbarItemText}>Tanvi Motwani</Text>
                </Surface>
                <View style={styles.appbarItem2}>
                    <Picker
                        mode="dropdown"
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        style={styles.appbarDropdown}
                    >
                        <Picker.Item label="Option 1" value="option1" />
                        <Picker.Item label="Option 2" value="option2" />
                        <Picker.Item label="Option 3" value="option3" />
                    </Picker>
                </View>
                <View style={styles.dateTimeContainer}>
                <Surface style={styles.dateTimeBox}>
                    <Text>{currentDate.toDateString()}</Text>
                    <Text>|</Text>
                    <Text>{formattedTime}</Text>
                </Surface>
                </View>
            </Appbar.Header>
            {/* <View style={styles.StatusContainer}>
            <Surface style={styles.StatusItem} elevation={1}>
                <Text style={styles.StatusItemText}>Online</Text>
            </Surface>
            </View> */}
            <View style={styles.MainContent}>
                <Card elevation={3} style={styles.MainContentCard}>
                    <Card.Title title="Register People" right={()=>(<Image resizeMode="center" style={styles.MainContentCardImg} source={require('../assets/images/registerPeople.png')}/>)}/>
                    <Card.Actions style={styles.MainContentCardAction}><Button icon='chevron-right' onPress={()=>console.log("Choice: Register People")} contentStyle={{flexDirection:'row-reverse'}} mode='contained' dark={false} style={styles.MainContentCardActionButton}>Continue</Button></Card.Actions>
                </Card>
                <Card elevation={3} style={styles.MainContentCard}>
                    <Card.Title title="Follow Up" right={()=>(<Image resizeMode="center" style={styles.MainContentCardImg} source={require('../assets/images/followUp.png')}/>)}/>
                    <Card.Actions style={styles.MainContentCardAction}><Button mode='contained' dark={false} onPress={()=>console.log("Choice: Follow Ups")} icon='chevron-right' contentStyle={{flexDirection:'row-reverse'}} style={styles.MainContentCardActionButton}>Continue</Button></Card.Actions>
                </Card>
            </View>
        </View>
    );
    
    ////Static
    // return (
    //     <View style={styles.HomePage}>
    //         <Appbar.Header style={styles.appbarContainer}>
    //             <Surface style={styles.appbarItem1}>
    //                 <Text style={styles.appbarItemText}>Tanvi Motwani</Text>
    //             </Surface>
    //             <View style={styles.appbarItem2}>
    //                 <Picker
    //                     mode="dropdown"
    //                     selectedValue={selectedValue}
    //                     onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    //                     style={styles.appbarDropdown}
    //                 >
    //                     <Picker.Item label="Option 1" value="option1" />
    //                     <Picker.Item label="Option 2" value="option2" />
    //                     <Picker.Item label="Option 3" value="option3" />
    //                 </Picker>
    //             </View>
    //         </Appbar.Header>
    //         <View style={styles.dateTimeContainer}>
    //             <Surface style={styles.dateTimeBox}>
    //                 <Text>{currentDate.toDateString()}</Text>
    //                 <Text>|</Text>
    //                 <Text>{formattedTime}</Text>
    //             </Surface>
    //         </View>
    //         {/* <View style={styles.StatusContainer}>
    //         <Surface style={styles.StatusItem} elevation={1}>
    //             <Text style={styles.StatusItemText}>Online</Text>
    //         </Surface>
    //         </View> */}
    //         <View style={styles.MainContent}>
    //             <Card elevation={3} style={styles.MainContentCard}>
    //                 <Card.Title title="Register People" right={()=>(<Image resizeMode="center" style={styles.MainContentCardImg} source={require('../assets/images/registerPeople.png')}/>)}/>
    //                 <Card.Actions style={styles.MainContentCardAction}><Button icon='chevron-right' onPress={()=>console.log("Choice: Register People")} contentStyle={{flexDirection:'row-reverse'}} mode='contained' dark={false} style={styles.MainContentCardActionButton}>Continue</Button></Card.Actions>
    //             </Card>
    //             <Card elevation={3} style={styles.MainContentCard}>
    //                 <Card.Title title="Follow Up" right={()=>(<Image resizeMode="center" style={styles.MainContentCardImg} source={require('../assets/images/followUp.png')}/>)}/>
    //                 <Card.Actions style={styles.MainContentCardAction}><Button mode='contained' dark={false} onPress={()=>console.log("Choice: Follow Ups")} icon='chevron-right' contentStyle={{flexDirection:'row-reverse'}} style={styles.MainContentCardActionButton}>Continue</Button></Card.Actions>
    //             </Card>
    //         </View>
    //     </View>
    // );
}

const styles = StyleSheet.create({
    HomePage:
    {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    appbarContainer: {
        marginTop: 10,
        // backgroundColor: '#E1F5FE', // Light blue background color
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10, // Increased padding vertically
        elevation: 2,
    },
    appbarItem1: {
        backgroundColor: '#BBDEFB', // Lighter blue
        height: 60, // Increased height
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 15,
        width: '55%', // Adjusted width for Surface
    },
    appbarItem2: {
        backgroundColor: '#FFFFFF', // White
        height: 60, // Increased height
        // borderColor: '#90CAF9', // Light blue border color
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 10,
        width: '40%',
    },
    appbarItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#37474F', // Dark blue text color
    },
    appbarDropdown: {
        height: 60, // Increased height
        width: '100%',
        color: '#37474F', // Dark blue text color
    },
    dateTimeContainer: {
        width:'80%',
        textAlign:'center',
        marginLeft:'10%',
        marginTop:10,
    },
    dateTimeBox: {
        flexDirection:'row',
        borderWidth: 2,
        justifyContent:'space-around',
        borderColor: '#BBDEFB', // Light blue border color
        borderRadius: 20, // Adjust this value to control the roundness of the border
        padding: 10,
    },
    StatusContainer:
    {
        marginTop:10,
        height:50,
        justifyContent:'center',
        flexDirection:'row'
    },
    StatusItem:
    {
        borderColor:'#66BB6A',
        borderRadius: 10,
        borderRadius:30,
        borderWidth:2,
        height:50,
        width:100,
        paddingVertical:15,
    },
    StatusItemText:
    {
        textAlign:'center',
        color: '#66BB6A', // White color for text
        fontSize: 16,
    },
    MainContent:{
        marginTop:20,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        gap:40,
    },
    MainContentCard:
    {
        backgroundColor:'white',
        width:'90%',
        height:200,
    },
    MainContentCardImg:
    {
        width:150,
        height:150,
        marginTop:20,
    },
    MainContentCardAction:
    {
        flexDirection:'column',
        justifyContent:'center',
    },
    MainContentCardActionButton:
    {
        backgroundColor:'#A7CAE7',
        height:50,
        paddingVertical:3,
        color:'#37474F'
    },
})

export default Home;

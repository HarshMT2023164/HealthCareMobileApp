import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet,StatusBar} from "react-native";
import { Avatar, Button, Card,Icon,Surface,Text} from "react-native-paper";

const MedicalReport = () => {

    const navigation = useNavigation();
    const handleFollowUp = ()=>
    {
        navigation.navigate('FollowUpScreen');
    }

    return (
        <View style={styles.container}>
            <Surface mode='flat' style={styles.patientSurface}>
                <View style={styles.patientSurfaceLeft}>
                </View>
                <View style={styles.patientSurfaceRight}>
                    <Avatar.Image style={styles.patientImg}size={90} source={require('../assets/images/userAvatar.png')}/>
                    <View style={styles.patientDetails}>
                        <Text style={styles.patientDetailsText}>Tanvi Motwani</Text>
                        <Text style={styles.patientDetailsText}>Female</Text>
                        <Text style={styles.patientDetailsText}>23</Text>
                        <Text style={styles.patientDetailsText}><Icon size={24} source='stethoscope' color="black"/> Dr. Nikita Gupta</Text>
                    </View>
                </View>
            </Surface>
            <Surface mode='elevated' elevation={4} style={styles.healthCard}>
                <View style={styles.healthCardHeading}>
                    <Text variant="titleMedium" >Diagnosis</Text>
                </View>
                <View style={styles.healthCardContent}>
                    <Text variant="bodyMedium">Name of disease</Text>
                    <Text variant="bodyMedium">ICD-10 Code</Text>
                </View>
            </Surface>
            <Surface mode='elevated' elevation={4} style={styles.healthCard}>
                <View style={styles.healthCardHeading}>
                    <Text variant="titleMedium" >Observations</Text>
                </View>
                <View style={styles.healthCardContent}>
                    <Text variant="bodyMedium" >Upon examination, notable symptoms indicative of anxiety disorder were observed, including [specific symptoms]. 
                    Additionally, [any relevant physical or behavioral observations]. 
                    These observations align with the diagnosis of anxiety disorder, warranting the prescribed treatment regimen.
                     Further monitoring and evaluation will be crucial to assess progress and adjust treatment as needed.</Text>
                </View>
            </Surface>
            <Surface mode='elevated' elevation={4} style={styles.healthCard}>
                <View style={styles.healthCardHeading}>
                    <Text variant="titleMedium" >Prescription</Text>
                </View>
                <View style={styles.healthCardContent}>
                    <Text variant="bodyMedium">Based on our evaluation, I recommend starting a treatment regimen for your anxiety disorder. 
                    Begin with Sertraline, 50mg orally daily in the morning, alongside Lorazepam, 0.5mg orally as needed for anxiety attacks, up to 3 doses daily.
                     Follow-up in 4 weeks for assessment. Take care.</Text>
                </View>
            </Surface>
            <Button icon='chevron-right' mode='elevated' style={styles.followupButton} textColor='black' buttonColor='#c8e3f7' onPress={handleFollowUp} contentStyle={{flexDirection:'row-reverse'}}>FollowUp</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: '10%',
    },
    patientSurface:
    {
        alignSelf:'center',
        borderRadius:10,
        flexDirection:'row',
        width:'90%',
        height:130,
    },
    patientSurfaceLeft:
    {
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        backgroundColor:'white',
        width:'20%',
        borderColor:'darkblue',
        borderLeftWidth:1,
        borderRightWidth:0,
        borderBottomWidth:1,
        borderTopWidth:1,
    },
    patientSurfaceRight:
    {
        paddingTop:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:'#c8e3f7',
        width:'80%',
        flexDirection:'row',
        gap:10,
        borderColor:'darkblue',
        borderLeftWidth:0,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderTopWidth:1,
    },
    patientImg:
    {
        marginLeft:'-15%',
        marginTop:5,
    },
    patientDetails:
    {
        paddingRight:10,
        flexDirection:'column'
    },
    patientDetailsText:
    {
        marginBottom:5,
        fontSize:16,
    },
    healthCard:
    {
        backgroundColor:'white',
        width:'90%',
        borderRadius:10,
        alignSelf:'center',
        marginTop:25,
    },
    healthCardHeading:
    {
        height:35,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'#c8e3f7',
        paddingTop:5,
        paddingLeft:5,

    },
    healthCardContent:
    {
        paddingLeft:10,
        paddingTop:10,
    },
    followupButton:
    {
        width:150,
        alignSelf:'center',
        marginTop:'8%',
    }
});

export default MedicalReport;

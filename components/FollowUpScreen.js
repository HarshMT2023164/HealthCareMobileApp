import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {  Avatar, Icon, Button } from "react-native-paper";
import { Askeys, getFromAsyncStorage, storeInAsyncStorage } from "../utils/AsyncStorageService";

import { insertFollowUpInstructionData, updateFollowUpById } from "../common/Database";
import { ADD_FOLLOUP_INSTRUCTIONS, BASE_URL } from "../common/Constants/URLs";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Card, Surface, Text, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
const FollowUpScreen = () => {

  const [followUp, setFollowUp] = useState(null);
  const navigation = useNavigation();

  const [noteText, setNoteText] = useState("");

    //Multilingual
  const {t} = useTranslation();

  const handleInputChange = (inputText) => {
    setNoteText(inputText);
  };

  const fetchFollowUp = async () => {
    const response = await getFromAsyncStorage(Askeys.FOLLOWUP);
    setFollowUp(response);
  };

  const addFollowUpInstruction = async () => {
    await updateFollowUpById(followUp.id , followUp);

    await insertFollowUpInstructionData({followUpId : followUp.id , instructions : noteText});

    await storeInAsyncStorage(Askeys.ABHAID);

    navigation.push("question");
    
    
  }

  const onAddNote = async () => {
    try {
    
        const reqBody = {followUpId : followUp.id , instructions : noteText};
        const objWithListOfFollowUps = {
          followUpInstructionsRequests: [reqBody]
        };
  
       
        const token = await getFromAsyncStorage(Askeys.TOKEN);
  
        const response = await axios.post(
          BASE_URL + ADD_FOLLOUP_INSTRUCTIONS,
          objWithListOfFollowUps,{
            headers : {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        if (response.status === 200) {
          console.log("Form data synced with backend successfully.");
          // await deleteAllDataFromTable(TableNames);
          // Optional: Handle successful sync (e.g., clear locally stored data)
        } else {
          console.error("Failed to sync form data with backend:", response.data);
        }
      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchFollowUp();
    // fetchInstructions();
  }, []);

  return (
    followUp && (
      <View style={styles.container}>
        <Surface mode='flat' style={styles.patientSurface}>
                <View style={styles.patientSurfaceLeft}>
                </View>
                <View style={styles.patientSurfaceRight}>
                    <Avatar.Image style={styles.patientImg}size={90} source={require('../assets/images/userAvatar.png')}/>
                    <View style={styles.patientDetails}>
                        <Text style={styles.patientDetailsText}>{followUp?.citizen?.name}</Text>
                        <Text style={styles.patientDetailsText}>{followUp?.citizen?.gender}</Text>
                        <Text style={styles.patientDetailsText}>{followUp?.citizen?.age}</Text>
                        <Text numberOfLines={2} style={styles.patientDetailsText}><Icon size={24} source='stethoscope' color="black"/> {followUp?.doctor?.name}</Text>
                        
                    </View>
                </View>
            </Surface>
        <Surface mode='elevated' elevation={4} style={styles.healthCard}>
                <View style={styles.healthCardHeading}>
                    <Text variant="titleMedium" >{t('Instructions')}</Text>
                </View>
                <View style={styles.healthCardContent}>
                    <Text variant="bodyMedium" >
                        {followUp?.instructions}
                    </Text>
                </View>
            </Surface>
        {/* <Surface mode="elevated" elevation={4} style={styles.followUpCard}>
          <Card.Content>
            <Text>Follow-up Note 2</Text>
          </Card.Content>
        </Surface>
        <Surface mode="elevated" elevation={4} style={styles.followUpCard}>
          <Card.Content>
            <Text>Follow-up Note 3</Text>
          </Card.Content>
        </Surface> */}
        <Card style={styles.notesCard}>
          <Card.Content>
            <TextInput
              style={styles.notesCardContent}
              label="Notes"
              value={noteText}
              onChangeText={handleInputChange}
              multiline
              numberOfLines={10}
              activeUnderlineColor="transparent"
              textAlignVertical="top"
              cursorColor="black"
            />
             <Button style={{margin : 20 , backgroundColor:"#bcd9f0" ,}} icon="plus"  mode="elevated" onPress={() => addFollowUpInstruction()}>
                <Text style={{color : "black"}}>{t('Note')} </Text>
          </Button>
          </Card.Content>
         
         
        </Card>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: "20%",
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
      flexDirection: "row",
      flexWrap : "wrap",
      textAlign : "justify",

  },

  followUpHeading: {
    width: "55%",
    alignSelf: "center",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#73c0fa",
    height: 50,
    alignItems: "center",
  },
  followUpCard: {
    borderLeftWidth: 10,
    borderLeftColor: "#73c0fa",
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    height: 80,
  },
  notesCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "lightgray",
  },
  notesCardContent: {
    backgroundColor: "white",
    
  },
  notesIcon: {
    marginTop: 10,
    marginLeft: 10,
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
     padding : 10
  },
});

export default FollowUpScreen;

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesome6,Ionicons } from '@expo/vector-icons';
import QuestionForm from './QuestionForm';
// import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
// import { fetchAllFormData } from '../common/Database';
// import { syncDataWithBackend } from '../utils/dataSyncService';
// import { BASE_URL, Fetch_Questionnarie } from '../common/urls';
import axios from 'axios';
const Questionnaire = () => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  }






  return (
    <View style={styles.container}>
    <View style={styles.heading}>
      <TouchableOpacity onPress={() => onBackPress()}>
      <Ionicons name="arrow-back" size={24} color={"white"} />
      </TouchableOpacity>
      <View style={styles.subHeadCont}>
      <FontAwesome6 style={{padding : 10 , backgroundColor: "white", borderRadius : 100 }} name="clipboard-question" size={24} color="black" />
      <Text style={styles.headingText}>Questionnaire</Text>
      </View>
    </View>
    <ScrollView>
    <QuestionForm />
    </ScrollView>
   
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingTop: 40,
      flex : 1,
      backgroundColor : "#F5F5F5"
    },
    heading: {
      display: "flex",
      flexDirection : "row",
      gap : 20,
      alignItems : "center",
      backgroundColor : '#7aa8d2',
      padding : 20,
      borderRadius : 5,
      color : "white",
      
    },
    subHeadCont : {
      display: "flex",
      flexDirection : "row",
      alignItems : "center",
      justifyContent : "center",
      gap : 10
    },
    headingText: {
      fontSize: 24,
      color : 'white'
    },
  });
  

export default Questionnaire
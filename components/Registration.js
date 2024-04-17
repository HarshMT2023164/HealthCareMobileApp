import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import RegistrationForm from "./RegistrationForm";
import { useNavigation } from "@react-navigation/core";


const Registration = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View style={styles.contaier}>
      <View style={styles.heading}>
        <Ionicons name="arrow-back" size={24} color={"white"} onPress={()=>navigation.goBack()}/>
        <View style={styles.subHeadCont}>
        <FontAwesome style={{padding : 10 , backgroundColor: "white", borderRadius : 100 }} name="wpforms" size={24}  color={"black"}/>
        <Text style={styles.headingText}>Register Patient</Text>
        </View>
      </View>
    <ScrollView>
        <RegistrationForm />
        </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  contaier: {
    padding: 10,
    paddingTop: 40,
    flex : 1,
    backgroundColor: "#F5F5F5"
  },
  heading: {
    display: "flex",
    flexDirection : "row",
    gap : 20,
    alignItems : "center",
    padding : 20,
    borderRadius : 5,
    color : "white",
    backgroundColor:'#7aa8d2'
    
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
    color : 'white',
  },
});

export default Registration;

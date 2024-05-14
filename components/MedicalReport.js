import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, DataTable, Icon, Surface, Text } from "react-native-paper";
import { Askeys, getFromAsyncStorage } from "../utils/AsyncStorageService";
import { useTranslation } from "react-i18next";



const MedicalReport = () => {
  const [followUp, setFollowUp] = useState(null);
  const navigation = useNavigation();

    //Multilingual
    const {t} = useTranslation();

  const handleFollowUp = () => {
    navigation.navigate("FollowUpScreen");
  };

  const getFollowUp = async () => {
    const data = await getFromAsyncStorage(Askeys.FOLLOWUP);
    console.log(data);
    setFollowUp(data);
  };


  useEffect(() => {
    getFollowUp();
  }, []);

  return (
    followUp && (
      <ScrollView>
      <View style={styles.container} id="medicalReport">
        
        <Surface mode="flat" style={styles.patientSurface}>
          <View style={styles.patientSurfaceLeft}></View>
          <View style={styles.patientSurfaceRight}>
            <Avatar.Image
              style={styles.patientImg}
              size={90}
              source={require("../assets/images/userAvatar.png")}
            />
            <View style={styles.patientDetails}>
              <Text style={styles.patientDetailsText}>
                {followUp?.citizen?.name}
              </Text>
              <Text style={styles.patientDetailsText}>
                {followUp?.citizen?.gender}
              </Text>
              <Text style={styles.patientDetailsText}>
                {followUp?.citizen?.age}
              </Text>
              <Text style={styles.patientDetailsText}>
                <Icon size={24} source="stethoscope" color="black" />{" "}
                {followUp?.doctor?.name}
              </Text>
            </View>
          </View>
        </Surface>
        <Surface mode="elevated" elevation={4} style={styles.healthCard}>
          <View style={styles.healthCardHeading}>
            <Text variant="titleMedium">{t('Diagnosis')}</Text>
          </View>
          <View style={styles.healthCardContent}>
            <Text>{followUp?.citizen?.healthRecordDTO?.diagnosis}</Text>
          </View>
        </Surface>
        {followUp &&
          followUp?.citizen &&
          followUp?.citizen?.healthRecordDTO &&
          followUp?.citizen?.healthRecordDTO?.prescriptions && (
            <Surface mode="elevated" elevation={4} style={styles.healthCard}>
              <View style={styles.healthCardHeading}>
                <Text variant="titleMedium">{t('Prescription')}</Text>
              </View>
              <ScrollView horizontal={true}>
              <View style={styles.healthCardContent}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={styles.tableColumn}>Medication</DataTable.Title>
                    <DataTable.Title style={styles.tableColumn}>MedicationType</DataTable.Title>
                    <DataTable.Title style={styles.tableColumn}>Dosage</DataTable.Title>
                    <DataTable.Title style={styles.tableColumn}>Frequency</DataTable.Title>
                    <DataTable.Title style={styles.tableColumn}>CustomInstructions</DataTable.Title>
                  </DataTable.Header>

                  {followUp?.citizen?.healthRecordDTO?.prescriptions.map(
                    (row) => (
                      <DataTable.Row key={row.id}>
                        <DataTable.Cell style={styles.tableColumn}>{row?.medication}</DataTable.Cell>
                        <DataTable.Cell style={styles.tableColumn}>
                          {row?.medicationType}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.tableColumn}>{row?.dosage}</DataTable.Cell>
                        <DataTable.Cell style={styles.tableColumn}>
                          {row?.frequency}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.tableColumn}>
                          {row?.customInstructions}
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  )}
                </DataTable>
              </View>
              </ScrollView>
            </Surface>
          )}
        <Surface mode="elevated" elevation={4} style={styles.healthCard}>
          <View style={styles.healthCardHeading}>
            <Text variant="titleMedium">Conclusion</Text>
          </View>
          <View style={styles.healthCardContent}>
            <Text variant="bodyMedium">
              {followUp?.citizen?.healthRecordDTO?.conclusion}
            </Text>
          </View>
        </Surface>
        <Button
          icon="chevron-right"
          mode="elevated"
          style={styles.followupButton}
          textColor="black"
          buttonColor="#c8e3f7"
          onPress={handleFollowUp}
          contentStyle={{ flexDirection: "row-reverse" }}
        >
          {t('Follow-Up')}
        </Button>
  
      </View>
      </ScrollView>
    )
  );
};
      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: "20%",
    paddingBottom:20
  },
  patientSurface: {
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    width: "90%",
    height: 130,
  },
  patientSurfaceLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "white",
    width: "20%",
    borderColor: "darkblue",
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  patientSurfaceRight: {
    paddingTop: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#c8e3f7",
    width: "80%",
    flexDirection: "row",
    gap: 10,
    borderColor: "darkblue",
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  patientImg: {
    marginLeft: "-15%",
    marginTop: 5,
  },
  patientDetails: {
    paddingRight: 10,
    flexDirection: "column",
  },
  patientDetailsText: {
    marginBottom: 5,
    fontSize: 16,
  },
  healthCard: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 25,
  },
  healthCardHeading: {
    height: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#c8e3f7",
    paddingTop: 5,
    paddingLeft: 5,
  },
  healthCardContent: {
    padding: 10,
  },
  followupButton: {
    width: 150,
    alignSelf: "center",
    marginTop: "8%",
  },
  tableColumn : {
    minWidth : 130,
    maxWidth:200,
    
  }
});

export default MedicalReport;

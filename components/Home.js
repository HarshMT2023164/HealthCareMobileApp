import React, { useContext, useEffect, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Appbar,
  Button,
  Card,
  Icon,
  Surface,
  Text
} from "react-native-paper";
import { TableNames } from "../common/Constants/DBConstants";
import {
  BASE_URL,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_DOCTORLIST,
  FETCH_FOLLOW_UP_LIST,
  FETCH_HOSPITALS,
  FETCH_QUESTIONNAIRE,
} from "../common/Constants/URLs";
import {
  deleteAllDataFromTable,
  insertDoctorToDb,
  insertFollowUpData,
  insertHospitalData,
  insertQuestionnaireData,
} from "../common/Database";
import { Askeys, getFromAsyncStorage } from "../utils/AsyncStorageService";
import LanguageContext from "../utils/Context/LanguageContext";
import { syncDataWithBackend } from "../utils/dataSyncService";

const Home = () => {
  const [selectedValue, setSelectedValue] = useState("option2");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  //Multilingual
  const {changeLanguage} = useContext(LanguageContext);
  const {t} = useTranslation();

  const fetchDoctorsList = async () => {
    try {
      const token = await getFromAsyncStorage(Askeys.TOKEN);
      console.log(token);
      const response = await axios.get(
        `${BASE_URL + FETCH_DOCTORLIST}?username=${"FHW41545"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
        }
      );
      console.log(response.data);

      deleteAllDataFromTable(TableNames.DoctorListTable)
        .then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log("All form data deleted successfully");
            // Additional logic after successful deletion
          } else {
            console.log("No form data found to delete");
          }

          response?.data.forEach((doctor) => {
            // console.log(doctor);
            insertDoctorToDb(doctor)
              .then(() => {
                console.log("doctor id: ", doctor);
                console.log(`Doctor '${doctor?.name}' inserted successfully`);
                // Additional logic after successful insertion (if needed)
              })
              .catch((error) => {
                console.error(
                  `Error inserting doctor '${doctor.name}':`,
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("Error deleting form data:", error);
        });
    } catch (error) {
      console.log("ERROR OF THEN 2:", error);
      // setLoading(true); // Set loading to false if there's an error
    }
  };

  const fetchQuestionnaire = async () => {
    try {
      const token = await getFromAsyncStorage(Askeys.TOKEN);
      console.log(token);
      const response = await axios.get(
        `${BASE_URL + FETCH_ALL_QUESTIONNAIRE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
        }
      );
      console.log(response.data);
      deleteAllDataFromTable(TableNames.QuestionnaireTable)
        .then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log("All questionary data deleted successfully");
            // Additional logic after successful deletion
          } else {
            console.log("No form data found to delete");
          }
          response?.data.forEach((questionnaire) => {insertQuestionnaireData(questionnaire)
            .then(() => {
              console.log(`Questionnaire data  inserted successfully`);
              // Additional logic after successful insertion (if needed)
            })
            .catch((error) => {
              console.error(`Error inserting questionnaire data : `, error);
            });
          })
        })
        .catch((error) => {
          console.error("Error deleting Questionnaire data:", error);
        });
    } catch (error) {
      console.log(error);
      // setLoading(true); // Set loading to false if there's an error
    }
  };

  const fetchFollowUpData = async () => {
    try {
      const token = await getFromAsyncStorage(Askeys.TOKEN);
      const FHWUsername = await getFromAsyncStorage(Askeys.FHW_USERNAME);
      console.log("Token : ", token);
      console.log("FHWUsername", FHWUsername);
      const response = await axios.get(
        `${BASE_URL + FETCH_FOLLOW_UP_LIST}?username=${FHWUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
        }
      );
      console.log("Followup data",response.data);
      deleteAllDataFromTable(TableNames.FollowUp)
        .then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log("All followup data deleted successfully");
            // Additional logic after successful deletion
          } else {
            console.log("No form data found to delete");
          }
          response?.data.forEach((followUp) => {
            // console.log(doctor);
            insertFollowUpData(followUp)
              .then(() => {
                console.log("inserted folloup ", followUp?.id);
                // Additional logic after successful insertion (if needed)
              })
              .catch((error) => {
                console.error(
                  `Error inserting followUp '${followUp.id}':`,
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("Error deleting followup data table:", error);
        });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // setLoading(true); // Set loading to false if there's an error
    }
  };


  const fetchHospitalList = async() => {
    try {
      const token = await getFromAsyncStorage(Askeys.TOKEN);
      const FHWUsername = await getFromAsyncStorage(Askeys.FHW_USERNAME);
      console.log(token);
      const response = await axios.get(
        `${BASE_URL + FETCH_HOSPITALS}?username=${FHWUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
        }
      );
      console.log(response.data);

      deleteAllDataFromTable(TableNames.HospitalTable)
        .then((rowsAffected) => {
          if (rowsAffected > 0) {
            console.log("All form data deleted successfully");
            // Additional logic after successful deletion
          } else {
            console.log("No form data found to delete");
          }

          response?.data.forEach((hospital) => {
            // console.log(doctor);
            insertHospitalData(hospital)
              .then(() => {
                console.log(`Hospital  inserted successfully`);
                // Additional logic after successful insertion (if needed)
              })
              .catch((error) => {
                console.error(
                  `Error inserting hospital`,
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("Error deleting form data of hospital:", error);
        });
    } catch (error) {
      console.log("ERROR OF THEN 2:", error);
      // setLoading(true); // Set loading to false if there's an error
    }
  }

  const fetchOnAppLoad = async () => {
    await fetchDoctorsList();
    await fetchQuestionnaire();
    await fetchFollowUpData();
    await fetchHospitalList();
  };

  const [isConnected, setIsConnected] = useState("Not connected");

  // useEffect(() => {
  //   const unsubscribeNetInfo = NetInfo.addEventListener(state => {
  //     if (state.isConnected) {
  //       // Network connection is available, trigger data sync
  //       console.log("isconnected");
  //       syncDataWithBackend();
  //       setIsConnected("it is connected") // Call your sync function here
  //     }
  //     else{
  //       console.log("is not connected");
  //       setIsConnected("disconnected");
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe from network state changes when component unmounts
  //     unsubscribeNetInfo();
  //   };
  // },[]);

  useEffect(() => {
    fetchOnAppLoad();

    // Initialize SQLite database
  }, []);

  useEffect(() => {
    // const interval = setInterval(() => {
    //     setCurrentDate(new Date());
    // }, 60000); // Update time every minute (60 seconds)
    // return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onSyncPress = () => {
    startSyncAnimation();
    syncDataWithBackend()
  }

  ////Dyamic
  const startSyncAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Once animation completes, reset the spin value
      setSpinValue(new Animated.Value(0));
    });
  };

  return (
    <View style={styles.HomePage}>
      <Appbar.Header style={styles.appbarContainer}>
        <Surface style={styles.appbarItem1}>
          <Text style={styles.appbarItemText}>Harshil</Text>
        </Surface>

        <View style={styles.appbarItem2}>
          <Picker
            mode="dropdown"
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              {
                setSelectedValue(itemValue);
                changeLanguage(itemValue);
              }
            }
            style={styles.appbarDropdown}
          >
            <Picker.Item label={t('English')} value="en" />
            <Picker.Item label={t('Hindi')} value="hin" />
            <Picker.Item label={t('Gujarati')} value="guj" />
          </Picker>
        </View>
        <View style={styles.appbarItem3}>
          <TouchableOpacity onPress={() => onSyncPress()}>
            <Animated.View
              style={[
                styles.appbarItem3,
                {
                  transform: [
                    {
                      rotate: spinValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Icon source="sync" size={30} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Appbar.Header>
      {/* <View style={styles.dateTimeContainer}>
                <Surface style={styles.dateTimeBox}>
                    <Text>{currentDate.toDateString()}</Text>
                    <Text>|</Text>
                    <Text>{formattedTime}</Text>
                </Surface>
            </View> */}
      {/* <View style={styles.StatusContainer}>
            <Surface style={styles.StatusItem} elevation={1}>
                <Text style={styles.StatusItemText}>Online</Text>
            </Surface>
            </View> */}
      <View style={styles.MainContent}>
        <Card elevation={3} style={styles.MainContentCard}>
          <Card.Title
            title={t('Register')}
            right={() => (
              <Image
                resizeMode="center"
                style={styles.MainContentCardImg}
                source={require("../assets/images/registerPeople.png")}
              />
            )}
          />
          <Card.Actions style={styles.MainContentCardAction}>
            <Button
              icon="chevron-right"
              onPress={() => navigation.navigate("register")}
              contentStyle={{ flexDirection: "row-reverse" }}
              mode="contained"
              dark={false}
              style={styles.MainContentCardActionButton}
            >
              {t('Continue')}
            </Button>
          </Card.Actions>
        </Card>
        <Card elevation={3} style={styles.MainContentCard}>
          <Card.Title
            title={t('Follow-Up')}
            right={() => (
              <Image
                resizeMode="center"
                style={styles.MainContentCardImg}
                source={require("../assets/images/followUp.png")}
              />
            )}
          />
          <Card.Actions style={styles.MainContentCardAction}>
            <Button
              mode="contained"
              dark={false}
              onPress={() => {
                navigation.push("followUpList");
              }}
              icon="chevron-right"
              contentStyle={{ flexDirection: "row-reverse" }}
              style={styles.MainContentCardActionButton}
            >
              {t('Continue')}
            </Button>
          </Card.Actions>
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
};

const styles = StyleSheet.create({
  HomePage: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  appbarContainer: {
    marginTop: 10,
    display: "flex",
    // backgroundColor: '#E1F5FE', // Light blue background color
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10, // Increased padding vertically
    elevation: 2,
  },
  appbarItem1: {
    backgroundColor: "#BBDEFB", // Lighter blue
    height: 50, // Increased height
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    width: "35%", // Adjusted width for Surface
  },
  appbarItem2: {
    backgroundColor: "#FFFFFF", // White
    height: 50, // Increased height
    // borderColor: '#90CAF9', // Light blue border color
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 10,
    width: "35%",
  },
  appbarItem3: {
    // padding: 10,
    width: "30%",
    display: "flex",
    alignItems: "center",
    padding : 0
  },
  appbarItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#37474F", // Dark blue text color
  },
  appbarDropdown: {
    height: 60, // Increased height
    width: "100%",
    color: "#37474F", // Dark blue text color
  },
  dateTimeContainer: {
    width: "80%",
    textAlign: "center",
    marginLeft: "10%",
    marginTop: 10,
  },
  dateTimeBox: {
    flexDirection: "row",
    borderWidth: 2,
    justifyContent: "space-around",
    borderColor: "#BBDEFB", // Light blue border color
    borderRadius: 20, // Adjust this value to control the roundness of the border
    padding: 10,
  },
  StatusContainer: {
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
  },
  StatusItem: {
    borderColor: "#66BB6A",
    borderRadius: 10,
    borderRadius: 30,
    borderWidth: 2,
    height: 60,
    width: 100,
    paddingVertical: 15,
  },
  StatusItemText: {
    textAlign: "center",
    color: "#66BB6A", // White color for text
    fontSize: 16,
  },
  MainContent: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 80,
    height: "100%",
  },
  MainContentCard: {
    backgroundColor: "white",
    width: "90%",
    height: 200,
  },
  MainContentCardImg: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  MainContentCardAction: {
    flexDirection: "column",
    justifyContent: "center",
  },
  MainContentCardActionButton: {
    backgroundColor: "#A7CAE7",
    height: 50,
    paddingVertical: 3,
    color: "#37474F",
  },
});

export default Home;

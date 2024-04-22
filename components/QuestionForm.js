import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, RadioButton, Text } from "react-native-paper";
import { deleteAllDataFromTable, fetchDoctorAssignmentsFromDb, fetchDoctorsFromDb, fetchQuestionnaireFromDb, fetchResponsesFromDb, insertDoctorToDb, insertResponse, insertResponseToDb } from "../common/Database";

import { TableNames } from '../common/Constants/DBConstants';
import { Askeys, getFromAsyncStorage, storeInAsyncStorage } from '../utils/AsyncStorageService';
const QuestionForm = () => {
  const [answers, setAnswers] = useState({});
  const [answerIds, setAnswerIds] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const navigation = useNavigation();
  const [score , setScore] = useState({});
 
  const data = {
    "id": 2,
    "name": "Mental Health Condition Assessment",
    "questions": [
        {
            "id": 11,
            "questionText": "How often do you feel overwhelming worry or fear about everyday situations?",
            "optionText": [
                "Never",
                "Rarely",
                "Sometimes",
                "Often",
                "Almost always"
            ],
            "optionValue": [
                0,
                1,
                2,
                3,
                4
            ]
        },
        {
            "id": 12,
            "questionText": "Do you often feel sad or hopeless?",
            "optionText": [
                "Never",
                "Rarely",
                "Sometimes",
                "Often"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 13,
            "questionText": "How frequently do you experience difficulty concentrating or staying focused?",
            "optionText": [
                "Never",
                "Rarely",
                "Sometimes",
                "Often",
                "Almost always"
            ],
            "optionValue": [
                0,
                1,
                2,
                3,
                4
            ]
        },
        {
            "id": 14,
            "questionText": "Do you often find yourself avoiding social situations?",
            "optionText": [
                "No, never",
                "Rarely",
                "Sometimes",
                "Yes, quite often"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 15,
            "questionText": "Do you have trouble falling asleep or staying asleep?",
            "optionText": [
                "No, never",
                "Rarely",
                "Sometimes",
                "Yes, often"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 16,
            "questionText": "How often do you experience sudden episodes of fear or panic?",
            "optionText": [
                "Never",
                "Rarely",
                "Sometimes",
                "Frequently"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 17,
            "questionText": "Do you engage in behaviors such as binge eating followed by purging or strict dieting?",
            "optionText": [
                "No, never",
                "Rarely",
                "Sometimes",
                "Yes, frequently"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 18,
            "questionText": "Do you often feel restless or have difficulty sitting still for long periods?",
            "optionText": [
                "No, not at all",
                "Sometimes",
                "Yes, frequently"
            ],
            "optionValue": [
                0,
                1,
                2
            ]
        },
        {
            "id": 19,
            "questionText": "Do you experience mood swings?",
            "optionText": [
                "No, never",
                "Rarely",
                "Sometimes",
                "Yes, often"
            ],
            "optionValue": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "id": 20,
            "questionText": "Do you have thoughts of harming yourself?",
            "optionText": [
                "No",
                "Yes"
            ],
            "optionValue": [
                0,
                1
            ]
        }
    ]
}




  const fetchQuestionnaire = async () => {
    try {
      const data = await fetchQuestionnaireFromDb();
      console.log("Fetched Assessment Data:", (data[0]?.questions));
  
      if (data && data.length > 0 && Array.isArray(data[0]?.questions)) {
        console.log("before setting data  :" , data[0].questions);
        setQuestionList(data[0]?.questions);
        
      } else {
        console.warn('Question data format is invalid or empty');
        // Handle invalid data or set default values for questionList
      }
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }

 
    

    // fetch(
    //   `${BASE_URL+Fetch_Questionnarie}?id=${1}`
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);
    //     // setList(json.data.cards[0].card.card.imageGridCards.info);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  
      // try {
        
      //   const response = await axios.get(`${BASE_URL+Fetch_Questionnarie}?id=${1}`, {
      //     // headers: {
      //     //   Authorization: `Bearer ${token}`,
      //     // },
      //   });
      //   setQuestionList(response.data);
       
      // } catch (error) {
      //   console.log(error);
      //   // setLoading(true); // Set loading to false if there's an error
      // }
    };

    const doctorList = [
      {
          "id": 1,
          "name": "Arjun Nileshbhai Gangani",
          "licenseId": "MCI-IN-982687",
          "age": 24,
          "gender": "Male",
          "specialty": "super psychiatrist",
          "phoneNum": 990456619,
          "email": "jertyt@gmail.com",
          "username": "DR58679",
          "password": "$2a$10$9CPMQBSRSFkIOoEwmGRZAOyMD73ylOgUJ.af6LSqEznJ8qiJLbZ.2",
          "active": true,
          "district": {
              "id": 1,
              "name": "Surat"
          }
      },
      {
          "id": 2,
          "name": "Vraj Naik",
          "licenseId": "MCI-IN-233411",
          "age": 23,
          "gender": "Male",
          "specialty": "physiatrist",
          "phoneNum": 1234567892,
          "email": "raj@gmail.com",
          "username": "DR66326",
          "password": "$2a$10$B.cMZlspJFAVf7zzLNmAyuwfgF9aev.XJTRcbDio9IHqBO5Dlwcp6",
          "active": true,
          "district": {
              "id": 1,
              "name": "Surat"
          }
      },
      {
          "id": 3,
          "name": "Dr. Rajesh Kumar",
          "licenseId": "MCI-IN-123456",
          "age": 35,
          "gender": "Male",
          "specialty": "psychiatrist",
          "phoneNum": 9876543210,
          "email": "rajesh.kumar@example.com",
          "username": "DR94118",
          "password": "$2a$10$XyEcetIyYBM90AR6zUfrpOAdNhzpRtCpBizny.327LAXufs/leBCq",
          "active": true,
          "district": {
              "id": 1,
              "name": "Surat"
          }
      }
  ]
  
  const fetchDoctors = async () => {
    try {
      const fetchedDoctors = await fetchDoctorsFromDb();
      console.log("fetched from db : ",fetchedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDoctorAssigns = async () => {
    try {
      const formData = await fetchDoctorAssignmentsFromDb();
      console.log(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const fetchQuestionnaireFromAsync = async () => {
    try {
      const data = await getFromAsyncStorage("Questionnaire");
      // setAssessmentData(data);
      console.log("data from aync : ", JSON.parse(data));
      
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }
  } 

  useEffect(() => {
  
    // fetchQuestionnaireFromAsync();
    fetchQuestionnaire();
    // fetchResponses();
    // fetchDoctors();
    // fetchDoctorAssigns();
    // const loadData = async () => {
    //   try {
    //     const data = await fetchAllFormData();
    //     console.log("form data on questionaaryy : " + data);
    //     // handleSync();
    //   } catch (error) {
    //     console.error('Failed to fetch data:', error);
    //   }
    // };

    // loadData();
  }, []);

  const fetchResponses = async () => {

      try {
        // Specify the table name from which to fetch data (e.g., 'PatientData')
        const tableName = 'PatientData';
        const responses = await fetchResponsesFromDb();
        console.log("Fetched responses from" , responses);
        // Use the fetched responses as needed in your component
      } catch (error) {
        console.error(`Error fetching responses:`, error);
      }
  }


  const handleAnswerChange = (questionId, value,qid, optionId, optionValue) => {
    setAnswerIds({
      ...answerIds,
      [qid] : optionId
    })

    setScore({
      ...score,
      [qid] : optionValue[optionId]
    });

    console.log(answerIds);
    
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const renderQuestions = () => {
    if (!Array.isArray(questionList)) {
      return null; // Render nothing or handle the empty state
    }
  
    return questionList.map((question, questionId) => {
      const { id, questionText, optionText, optionValue } = question;
      return (
        <Card key={id} style={styles.card}>
          <Card.Content>
            <Text style={styles.questionText}>{questionText}</Text>
            {optionText.map((option, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={option}
                  status={answers[id] === option ? "checked" : "unchecked"}
                  onPress={() => handleAnswerChange(id, option, questionId, index,optionValue)}
                />
                <Text>{option}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      );
    });
  };
  

  const handleSubmit = async () => {
    // Handle submission logic (e.g., send answers to server, navigate to result screen)
  const answeredQuestions = Object.keys(answerIds);
  const totalQuestions = questionList.length;

  if (answeredQuestions.length !== totalQuestions) {
    console.log('Please answer all questions before submitting.');
    return; // Don't proceed with submission
  }
    let calculatedScore = 0;
    for(key in score){
      calculatedScore += score[key];
    }
    let calculateMaxScore = 0;
        questionList.map((item) => {
          item.optionValue.map((optionScore) => {
            console.log(optionScore);
            calculateMaxScore = calculateMaxScore +  optionScore;
          })
        })
      console.log(calculateMaxScore);

    const scoreToStore = {score : calculatedScore , maxScore : calculateMaxScore};
    // console.log(scoreToStore);
  
    await storeInAsyncStorage(Askeys.SCORE , scoreToStore);
    navigation.navigate('healthCard');
    const abhaId = await getFromAsyncStorage("abhaId");
    console.log("fetched abhaid :", abhaId);
    insertResponseToDb(abhaId , answerIds , calculatedScore).then(() => {
      console.log("Questionnaire response submitted sucessfully");
     
    }).catch(() => {
      console.log("Error submitting questiiionnaire data");
    });
    
    // You can add your logic here to process the answers
  };

  const insertDoctors = (doctors) => {
    doctors.forEach((doctor) => {
      insertDoctorToDb(doctor);
    });
  };

  
  

  const handleSubmitToDb = () => {
    deleteAllDataFromTable(TableNames.DoctorListTable).then((rowsAffected) => {
      if (rowsAffected > 0) {
        console.log('All form data deleted successfully');
        // Additional logic after successful deletion
      } else {
        console.log('No form data found to delete');
      }
    })
    .catch((error) => {
      console.error('Error deleting form data:', error);
    });
    // insertDoctorAssignmentToDb({abhaId : "ab1" , doctorUsername : "doc1"});
  }

  return (
    <View>
      <View style={styles.container}>{renderQuestions()}</View>
      <View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={() => handleSubmit()}
        >
          Submit
        </Button>
      </View>
      <View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={handleSubmitToDb}
        >
          SubmitToDb
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   flexGrow: 1,
    padding: 16,
    // backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    margin: 10,
    
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor : '#7aa8d2'
  },
});

export default QuestionForm;

// import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { RadioButton, Text, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { BASE_URL, Fetch_Questionnarie } from "../common/urls";

const QuestionForm = () => {
  const [answers, setAnswers] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const navigation = useNavigation();
  const data = {
    id: 1,
    name: "registeration",
    questions: [
      {
        id: 1,
        questionText:
          "Which of the following is a symptom of Generalized Anxiety Disorder?",
        options: [
          "Panic Attacks",
          "Excessive Happiness",
          "Elevated Heart Rate",
          "Decreased Appetite",
        ],
      },
      {
        id: 2,
        questionText:
          "What is a common symptom of Obsessive-Compulsive Disorder (OCD)?",
        options: [
          "Repetitive Behaviors",
          "Excessive Sleeping",
          "Hallucinations",
          "Social Withdrawal",
        ],
      },
      {
        id: 3,
        questionText:
          "Which mental health condition involves persistent feelings of sadness and hopelessness?",
        options: [
          "Major Depressive Disorder",
          "Borderline Personality Disorder",
          "Bipolar Disorder",
          "Schizophrenia",
        ],
      },
      {
        id: 4,
        questionText:
          "What is a common characteristic of Post-Traumatic Stress Disorder (PTSD)?",
        options: [
          "Flashbacks",
          "Excessive Talking",
          "Elevated Self-Esteem",
          "Improved Concentration",
        ],
      },
      {
        id: 5,
        questionText:
          "Which of the following is a symptom of Social Anxiety Disorder?",
        options: [
          "Fear of Social Situations",
          "Excessive Risk-Taking",
          "Decreased Heart Rate",
          "Increased Appetite",
        ],
      },
      {
        id: 6,
        questionText: "What is a common symptom of Panic Disorder?",
        options: [
          "Sweating",
          "Decreased Heart Rate",
          "Euphoria",
          "Heightened Sensory Perception",
        ],
      },
      {
        id: 7,
        questionText:
          "Which mental health condition involves recurring thoughts of suicide or self-harm?",
        options: [
          "Depersonalization Disorder",
          "Borderline Personality Disorder",
          "Bipolar Disorder",
          "Major Depressive Disorder",
        ],
      },
      {
        id: 8,
        questionText:
          "What is a common characteristic of Schizotypal Personality Disorder?",
        options: [
          "Odd Beliefs or Magical Thinking",
          "High Levels of Trust",
          "Avoidance of Social Interaction",
          "Disregard for Consequences",
        ],
      },
      {
        id: 9,
        questionText:
          "Which of the following is a symptom of Eating Disorders like Bulimia Nervosa?",
        options: [
          "Binge Eating Followed by Purging",
          "Excessive Physical Activity",
          "Decreased Appetite",
          "Intolerance to Cold",
        ],
      },
      {
        id: 10,
        questionText:
          "What is a common symptom of Attention-Deficit/Hyperactivity Disorder (ADHD)?",
        options: [
          "Inattention",
          "Elevated Mood",
          "Decreased Energy Levels",
          "Excessive Sleepiness",
        ],
      },
    ],
  };

  const fetchQuestionnaire = async () => {
    setQuestionList(data.questions);
    // fetch(
    //   ${BASE_URL+Fetch_Questionnarie}?id=${1}
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
        
      //   const response = await axios.get(${BASE_URL+Fetch_Questionnarie}?id=${1}, {
      //     // headers: {
      //     //   Authorization: Bearer ${token},
      //     // },
      //   });
      //   setQuestionList(response.data);
       
      // } catch (error) {
      //   console.log(error);
      //   // setLoading(true); // Set loading to false if there's an error
      // }
    };

  useEffect(() => {
    fetchQuestionnaire();
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

  // Define your list of questions with options
  // const questions = [
  //   {
  //     id: 1,
  //     question: 'How would you rate your overall mental well-being?',
  //     options: ['Excellent', 'Good', 'Fair', 'Poor'],
  //   },
  //   {
  //     id: 2,
  //     question: 'Are you generally satisfied with your life right now?',
  //     options: ['Very satisfied', 'Somewhat satisfied', 'Neutral', 'Somewhat dissatisfied', 'Very dissatisfied'],
  //   },
  //   {
  //     id: 3,
  //     question: 'Have you experienced any major life changes or stressors recently?',
  //     options: ['Yes, several', 'Yes, one significant change', 'No, not recently'],
  //   },
  //   {
  //     id: 4,
  //     question: 'Do you often feel sad, empty, or hopeless?',
  //     options: ['Not at all', 'Occasionally', 'Frequently', 'Almost all the time'],
  //   },
  //   {
  //     id: 5,
  //     question: 'Are you frequently irritable or easily angered?',
  //     options: ['Rarely', 'Sometimes', 'Often', 'Most of the time'],
  //   },
  //   {
  //     id: 6,
  //     question: 'Have you lost interest or pleasure in activities you once enjoyed?',
  //     options: ['Not at all', 'Slightly', 'Moderately', 'Severely'],
  //   },
  //   {
  //     id: 7,
  //     question: 'Do you feel anxious or worried most of the time?',
  //     options: ['Never', 'Occasionally', 'Often', 'Almost constantly'],
  //   },
  //   {
  //     id: 8,
  //     question: 'Do you have trouble sleeping due to racing thoughts or worries?',
  //     options: ['Never', 'Sometimes', 'Frequently', 'Almost every night'],
  //   },
  //   {
  //     id: 9,
  //     question: 'How would you rate the quality of your sleep?',
  //     options: ['Excellent', 'Good', 'Fair', 'Poor'],
  //   },
  //   {
  //     id: 10,
  //     question: 'Do you often feel fatigued or lacking in energy?',
  //     options: ['Rarely', 'Sometimes', 'Often', 'Almost always'],
  //   },
  //   {
  //     id: 11,
  //     question: 'Have you noticed changes in your appetite (eating more or less than usual)?',
  //     options: ['No changes', 'Eating more than usual', 'Eating less than usual'],
  //   },
  //   {
  //     id: 12,
  //     question: 'Do you find it difficult to concentrate or make decisions?',
  //     options: ['Not at all', 'Occasionally', 'Frequently', 'Constantly'],
  //   },
  //   {
  //     id: 13,
  //     question: 'Are you withdrawing from social activities or avoiding friends and family?',
  //     options: ['Not at all', 'Sometimes', 'Often', 'Most of the time'],
  //   },
  //   {
  //     id: 14,
  //     question: 'How would you describe your self-esteem and self-worth?',
  //     options: ['Very high', 'Moderate', 'Low', 'Very low'],
  //   },
  //   {
  //     id: 15,
  //     question: 'Have you had thoughts of self-harm or suicide?',
  //     options: ['No, never', 'Rarely', 'Sometimes', 'Often'],
  //   },
  //   {
  //     id: 16,
  //     question: 'Have you ever been diagnosed with a mental health condition?',
  //     options: ['Yes', 'No'],
  //   },
  //   {
  //     id: 17,
  //     question: 'Are you currently receiving treatment or therapy for any mental health issues?',
  //     options: ['Yes', 'No'],
  //   },
  //   {
  //     id: 18,
  //     question: 'How is your mental health affecting your work, school, or daily responsibilities?',
  //     options: ['Not at all', 'Somewhat', 'Significantly'],
  //   },
  //   {
  //     id: 19,
  //     question: 'Do you have a family history of mental health disorders?',
  //     options: ['Yes', 'No'],
  //   },
  // ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const renderQuestions = () => {
    return questionList.map((question) => {
      const { id, questionText, options } = question;
      return (
        <Card key={id} style={styles.card}>
          <Card.Content>
            <Text style={styles.questionText}>{questionText}</Text>
            {options.map((option, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={option}
                  status={answers[id] === option ? "checked" : "unchecked"}
                  onPress={() => handleAnswerChange(id, option)}
                />
                <Text>{option}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      );
    });
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., send answers to server, navigate to result screen)
    console.log("Submitted answers:", answers);
    navigation.navigate('healthCard');
    // You can add your logic here to process the answers
  };

  return (
    <View>
      <View style={styles.container}>{renderQuestions()}</View>
      <View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          Submit
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
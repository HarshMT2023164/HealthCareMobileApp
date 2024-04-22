import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button, Card, Icon, Surface, Text } from 'react-native-paper';
import { fetchDoctorsFromDb } from '../common/Database';
import { Askeys, getFromAsyncStorage } from "../utils/AsyncStorageService";

const HealthCard2 = () => {
  const navigation = useNavigation();

  const [user,setUser] = useState({
    name:'',
    age:'',
    gender:'',
  });
  const [scoreObj , setScoreObj] = useState({score: 0 , maxScore : 29});

  const fetchDoctors = async() => {
    console.log("called f");
    try {
      const fetchedDoctors = await fetchDoctorsFromDb();
      console.log("fetched Doctors from doctor screen" , fetchedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  

  const setFromAsyncStorage = async () => {
    const res = await getFromAsyncStorage(Askeys.REGISTER_USER);
    setUser(res);
    const score = await getFromAsyncStorage(Askeys.SCORE);
    console.log(score);
    setScoreObj(score);

  }

  useEffect(() => {
    setFromAsyncStorage();
  
  },[])

  
  const handleContinue = ()=>{
    navigation.navigate('doctorList');
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userObjectString = await AsyncStorage.getItem('userObject');
  //       const userObject = JSON.parse(userObjectString);
  //       console.log("Hello", userObject);

  //       const temp = {
  //         name: userObject.name,
  //         gender: userObject.gender,
  //         age: userObject.age,
  //       };
  //       console.log(temp);
  //       setUser(temp);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData(); // Call the async function
  // }, []);

  return (
    <View style={styles.container}>
       
      <Surface mode='elevated' style={styles.scoreCardSurface} elevation={4}>
         <View mode="flat" style={styles.namecard}>
          <View><Icon source='account'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>{user?.name}  |</Text></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>{user?.age}  |</Text></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>{user?.gender}</Text></View>
         </View>
      {/* <Text style={styles.title}>Health Score</Text> */}
      
      <CircularProgress
       title='Health Score'
       maxValue={scoreObj.maxScore}
       titleFontSize={16}
        value={scoreObj.score}
        radius={100}
        inActiveStrokeOpacity={0.5}
        activeStrokeWidth={15}
        inActiveStrokeWidth={20}
        progressValueStyle={{ fontWeight: '100', color: 'green' }}
        activeStrokeSecondaryColor="yellow"
        inActiveStrokeColor="black"
        duration={1000}
        dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
        />
         <Text >*Calculated from Questionnaries</Text>
      </Surface>
      <Surface mode='flat' style={styles.details}>
        {/* <Chip mode="flat" style={styles.namecard}avatar={<Avatar.Icon  icon="account" size={30}/>}><Text>Himmatwala Das</Text></Chip>  */}
        {/* <Card style={{height:50,width:200,alignSelf:'center',flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Text>Results</Text></Card> */}
        <Card style={{paddingTop:20,marginTop:20,gap:30,height:200,width:'80%',alignSelf:'center',flexDirection:'column',alignItems:'center',backgroundColor:'#f5f5f5'}}>
          <Text style={{alignSelf:'center',marginBottom:30,fontWeight:'bold'}}>Surat</Text>
          <Surface mode='elevated' style={{width:'100%',height:80,alignSelf:'center',alignItems:'center',padding:20,backgroundColor:'#bcd9f0',borderRadius:20}}>
            <Text>To see the Available Doctors</Text>
            <Text>Click on Continue!</Text>
          </Surface>
          </Card>
          <Button
        mode="contained"
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Button>

        {/* <View style={styles.detailsItem}>
          <Text style={styles.detailsItemText}>Name: Himmatwala Das</Text>
          <Text style={styles.detailsItemText}>Age: 35</Text>
          <Text style={styles.detailsItemText}>Gender: Male</Text>
        </View> */}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
   
    flexDirection:'column',
   
  },
  title:{
  fontSize:18,
  fontWeight:'bold',
  marginBottom:-10
  },
  button: {
    width: '45%',
    marginTop: 20,
    alignSelf:'center',
    backgroundColor: '#bcd9f0', // Light blue color
    borderRadius: 20,
    marginBottom:0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  namecard:{
    backgroundColor:'white',
    width:'80%',
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    gap:10,
    alignItems:'center',
    borderRadius:30,
  },
  scoreCardSurface: {

    alignItems:'center',
    height: '50%',
    width: '100%',
    flexDirection:'column',
    justifyContent:'center',
    gap:37,
    backgroundColor: '#bcd9f0',
    alignSelf: 'center',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  details:
  {
    paddingTop:10,
    flexDirection:'column',
    gap:10,
    backgroundColor:'white',
    height:290,
    marginTop:20,
    width:"88%",
    alignSelf:'center',
    borderRadius:20
  },
  detailsItem:
  {
    paddingLeft:10,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
  },
  detailsItemText:
  {
    fontSize:16,
  }
});

export default HealthCard2;

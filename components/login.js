import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Button, Card, TextInput, Title } from 'react-native-paper';
const Login = () => {
  const windowHeight = useWindowDimensions().height;
    const windowWidth= useWindowDimensions().width;

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const authenticate = async () => {
    try {
      // Mocking axios post call
      //const res = await axios.post("http://192.168.127.137:8080/auth/signin", user);
      console.log("Authentication successful!");
      await AsyncStorage.setItem("token","trial123");
      console.log(await AsyncStorage.getItem("token"));
    } catch (err) {
      setErrorMessage("Username or password is incorrect");
      console.log('Username or password incorrect in catch');
    }
  };

  const handleInputChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleBlur = (name, value) => {
    if (name === "username" && !value.trim()) {
      setErrors({
        ...errors,
        username: "Username is required",
      });
    } else if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    
    <View style={styles.container}>
       <LottieView
                        source={require('../assets/login_animated2.json')} // Path to your animation JSON file
                        autoPlay
                        loop
                         style={[styles.imageBackground, { height: windowHeight/4,width:windowWidth }]}
                    />
      <Card mode='elevated' style={styles.card}>
        {/* <Card.Actions>
          <Button icon ={()=> <Image source={require('../assets/Healthcare_Worker.jpg')}  />}/>
        </Card.Actions> */}
        
     {/* <Image source={require('../assets/Healthcare_Worker.jpg')} style={styles.logo} /> */}
        <Card.Content style={styles.cardContent}>
          <Title style={styles.title}>Login</Title>

          <TextInput
            left={<TextInput.Icon icon="account" />}
            mode='flat'
            label='Username'
            style={styles.input}
            onChangeText={(value) => handleInputChange("username", value)}
            onBlur={() => handleBlur("username", user.username)}
            value={user.username}
            error={errors.username ? true : false}
          />
          <View>{errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}</View>
          
          <TextInput
            left={<TextInput.Icon icon="lock" />}
            mode='flat'
            label='Password'
            style={styles.input}
            onChangeText={(value) => handleInputChange("password", value)}
            onBlur={() => handleBlur("password", user.password)}
            value={user.password}
            secureTextEntry={true}
            error={errors.password ? true : false}
          />
          <View>{errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}</View>
         
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          if (!errors.username && !errors.password) {
            authenticate();
          }
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Button>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    bottom:5,
    width: '100%',
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue color
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop:40,
    marginBottom: 50,
    borderRadius: 75,// half of width and height to make it circular
    },
  card: {
    width: '83%',
    backgroundColor: 'white',
    // marginBottom:50
  },
  cardContent: {
    marginTop:60,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom:10,
    marginTop:-66,
    fontSize: 24, // Adjust the font size
    fontWeight: 'bold', // Apply bold font weight
    color: '#333', // Adjust title color
  },
  input: {
    marginBottom: 20,
    backgroundColor:'#f0f8ff'
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '45%',
    marginTop: 20,
    backgroundColor: '#5a8de9', // Light blue color
    borderRadius: 20,
    marginBottom:0
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});

export default Login;

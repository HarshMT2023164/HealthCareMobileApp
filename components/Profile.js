import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Icon, IconButton, Surface, Text } from 'react-native-paper';


const Profile = () => (
    
    <View style={styles.container}>  
     <Card style={{borderRadius:2,marginTop:30,height:40,width:"100%",alignSelf:'center',flexDirection:'column',justifyContent:'center',backgroundColor:'white'}}>
        <Text style={{fontWeight:'bold',fontSize:16,marginLeft:100}}>Profile: FHW27324</Text>
          </Card>      
        <Card style={{borderRadius:100,marginTop:20,marginBottom:-20,height:180,width:190,alignSelf:'center',flexDirection:'column',backgroundColor:'#f5f5f5'}}>
        <View style={styles.cameraButtonContainer}>
        <IconButton
          style={styles.cameraButton}
          icon="camera"
          color="black"
          size={24}
          onPress={() => {
            // Handle camera icon press
          }}
        />
      </View>
        <Image source={require('../assets/Healthcare_Worker.jpg')} style={styles.logo} />
        
          </Card>
    
       
      <Surface mode='elevated' style={styles.Profiledetails} elevation={4}>
        
         <View mode="flat" style={styles.namecard}>
          <View><Icon source='account'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>Harshil Raha</Text></View>
          </View>
          <View mode="flat" style={styles.namecard}>
          <View><Icon source='phone'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>8166778888</Text></View>
          </View>
          <View mode="flat" style={styles.namecard}>
          <View><Icon source='email'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>harshil@gmail.com</Text></View>
          </View>
          <View  style={styles.namecard}>
          <View><Icon source='calendar'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>23 years</Text></View>
          </View>
          <View style={styles.namecard}>
          <View><Icon source='gender-male'size={24} color='black'/></View>
          <View><Text style={{fontWeight:'bold',fontSize:16,}}>male</Text></View>
          </View>
      </Surface>
      
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:-70,
    backgroundColor: '#A7CAE7',
    flexDirection:'column',
   
  },
  cameraButtonContainer: {
    position: 'absolute',
    //backgroundColor:'black',
    marginRight:10,
    marginTop:120,
    right:-20 ,
  },
  cameraButton: {
    margin: 10,
    backgroundColor: 'lightgray',
    borderWidth:1
  },
  // details:
  // {
  //  // paddingTop:100,
  //   flexDirection:'column',
  //   gap:10,
  //   backgroundColor:'white',
  //   height:190,
    
  //   width:180,
  //   alignSelf:'center',
  //   borderRadius:90
  // },
  logo: {
    width: 150,
    height: 150,
    alignSelf:'center',
    marginTop:15,  
    elevation:10,  
    borderRadius: 75,
    }, 
   Profiledetails: {
      marginTop:45,
      // marginRight:30,
      alignItems:'center',
      height: '58%',
      width: '90%',
      flexDirection:'column',
      justifyContent:'center',
      gap:37,
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius:30,
      //borderTopLeftRadius: 60,
      // borderTopRightRadius: 60,
      // borderBottomRightRadius:40,
    },
    editText: {
      fontSize: 12,
      color: 'black',
    },
    namecard:{
      
      // marginRight:30,
      backgroundColor:'#A7CAE7',
      width:'88%',
      height:40,
      flexDirection:'row',
      justifyContent:'center',
      gap:20,
      alignItems:'center',
      borderRadius:30,
      // borderTopRightRadius:80,
      // borderBottomRightRadius:80,
      elevation:10
    },
   
  });

export default Profile;


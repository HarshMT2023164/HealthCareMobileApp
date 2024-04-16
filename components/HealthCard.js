import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';

const HealthCard = () => (
  <View style={styles.container}>
    <Surface style={{...styles.surface,padding:10}} >
      <Text>Results</Text>
    </Surface>
    <Surface style={{alignItems:'center',height:30,padding:5,width:300,alignSelf:'center'}} elevation={1}>
      <Text>Miss Malini Maheshwari</Text>
    </Surface>
    <Surface style={{...styles.surface,backgroundColor: '#f0f8ff',height:300,width:400,alignSelf:'center',flexDirection:'column',width:315,gap:20}}>
          <Surface style={{height:"20%",width:250,alignItems:'center',gap:20}}>
              <Text>Mild Depression</Text>
          </Surface>
          <View style={{ height:"80%", flexDirection: 'row',width:300,gap:15,padding:10}}>
            <Surface style={{ flex: 1 }}>
              <Text>jo</Text>
            </Surface>
            <Surface style={{ flex: 1 }}>
              <Text>hi</Text>
            </Surface>
            </View>
    </Surface>
    <Surface style={{height:30,width:250,alignItems:'center',alignSelf:'center',padding:5}}>
      <Text style={styles.Text}>Assign Doctor</Text>
    </Surface>

  </View>
);

const styles = StyleSheet.create({
  surface: {
    padding: 50,
    borderRadius: 8,
    elevation: 4,
    margin: 40,
    alignItems: 'center',
  },
  container: {
    flex:1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  Text: {
    fontSize: 14,
    fontWeight: 'bold',
    alignContent:'space-around'
  },
});

export default HealthCard;

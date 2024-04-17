import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper'; // Importing Button component from React Native Paper
const WelcomeScreen = () => {
    const navigation = useNavigation();
    const windowHeight = useWindowDimensions().height;

    const handleLoginPress = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ImageBackground
                    style={[styles.imageBackground, { height: windowHeight / 2.5 }]}
                    resizeMode="cover"
                    source={require('../assets/Healthcare_Worker.jpg')}
                />
                <View style={styles.contentContainer}>
                    <Text variant="displayMedium"style={styles.title}>FIELD HEALTHCARE WORKER</Text>
                    <Button 
                        mode="contained-tonal" 
                        onPress={handleLoginPress} 
                        style={styles.loginButton}
                        labelStyle={styles.buttonText}
                    >
                        Let's Get Started
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor:'#f5f5f5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBackground: {
        bottom:100,
        width: '100%',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 70,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        bottom:40,
        paddingHorizontal:40,
        textAlign: 'center',
    },
    loginButton: {
        width: '80%',
        backgroundColor:'#7aa8d2',
        borderColor:'black',
        borderWidth:1,
       
    },
    buttonText: {
        fontSize: 19,

    },
});

export default WelcomeScreen;

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Importing LottieView
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';
const WelcomeScreen = () => {
    const navigation = useNavigation();
    const windowHeight = useWindowDimensions().height;
    const windowWidth= useWindowDimensions().width;

    const handleLoginPress = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
            <LottieView
                        source={require('../assets/animated.json')} // Path to your animation JSON file
                        autoPlay
                        loop
                         style={[styles.imageBackground, { height: windowHeight,width:windowWidth }]}
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
        backgroundColor:'#e1f5fe',
        borderColor:'black',
        borderWidth:1,
    },
    buttonText: {
        fontSize: 19,
    },
    lottieAnimation: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
    },
});

export default WelcomeScreen;

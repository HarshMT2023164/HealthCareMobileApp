import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
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
                    source={require('../assets/animated.json')}
                    autoPlay
                    loop
                    style={[styles.lottieAnimation, { height: windowHeight * 0.6, width: windowWidth }]}
                />
                <View style={styles.contentContainer}>
                  <Image source={require('../assets/logo.png')} style={styles.logo} />
                    {/* <Card style={styles.card}>
                        <Text style={styles.title}>ZENCARE</Text>
                    </Card> */}
                    <Button 
                        mode="contained" 
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
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop:40,
        marginBottom: 20,
        borderRadius: 75,// half of width and height to make it circular
        },
    safeArea: {
        flex: 1,
        backgroundColor:'#f5f5f5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 70,
        alignItems: 'center',
    },
    card: {
        marginBottom: 20,
        width:200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    loginButton: {
        width: '80%',
        borderColor:'black',
        borderWidth:1,
       
        backgroundColor: '#2196F3',
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    lottieAnimation: {
        width: '100%',
        marginBottom: 80,
    },
});

export default WelcomeScreen;

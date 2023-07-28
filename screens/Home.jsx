import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function HomeScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.id,
    });
  }, []);

  useEffect(() => {
    // Check if the user is signed in when the component mounts
    isSignedIn();

    // Add a listener to check user sign-in status when the Home screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      isSignedIn();
    });

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  const signIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);

    // Update the isLogin state to true since the user is now logged in
    setIsLogin(true);
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
       setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsLogin(isSignedIn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      {!isLogin ? (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn} 
        />
      ) : (
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Room')}
        >
          <Text>Go to Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.signOutButton}
        onPress={signOut}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
         
        </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    alignItems: 'center',
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

import React, { useRef,useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button,AppState, TextInput, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


function HomeScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [isloading,setLoading]=useState();
  const [user,setUser]=useState();

 

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "309533048065-vked08ii07afb7qkp20nl4qhj38tjbms.apps.googleusercontent.com",
    });

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
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
  const signInWithemail=async()=>{
    setLoading(true);
    try{
      const response= await auth().signInWithEmailAndPassword(email,password);
      setUser(response.user);
      setIsLogin(true);
      console.log(response);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }

  }
  const signUp=async()=>{
    setLoading(true);
    try{
      const response= await auth().createUserWithEmailAndPassword(email,password);
      console.log(response);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }

  }


  const handleAppStateChange = (nextAppState) => {
    // If the app goes into inactive state, sign out the user
    if (appState.current.match(/inactive|background/)) {
      signOut();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsLogin(isSignedIn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      {!isLogin ? (
        <KeyboardAvoidingView behavior='padding'>
        <View> 
        <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        {isloading ? <ActivityIndicator size={'large'} color='#0000ff'></ActivityIndicator> 
        :(
          <>
          <TouchableOpacity
          style={styles.button}
          onPress={signInWithemail}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={signUp}
        >
          <Text>create account</Text>
        </TouchableOpacity>
          </>
        )}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          padding={10}
          onPress={signIn} 
        />
        </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateRoom')}
        >
          <Text>create room</Text>
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
    backgroundColor: '#004e92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 10,
    margin: 5
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
  input:{
    marginVertical: 4,
    height :50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    color: 'black'
  }
});

export default HomeScreen;

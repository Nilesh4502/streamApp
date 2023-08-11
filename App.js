import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'; // Import auth from @react-native-firebase/auth

import RoomScreen from './screens/Room';
import VideoScreen from './screens/Video';
import HomeScreen from './screens/Home';
import CreateRoom from './screens/CreateRoom';
const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Room' : 'Home'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#004e92',
            },
            headerTintColor: '#fff', // Change the heading color to white
          }}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{
            title: 'Rooms',
            headerStyle: {
              backgroundColor: '#004e92',
            },
            headerTintColor: '#fff', // Change the heading color to white
          }}
        />
         <Stack.Screen
          name="CretateRoom"
          component={CreateRoom}
          options={{
            title: 'CreateRoom',
            headerStyle: {
              backgroundColor: '#004e92',
            },
            headerTintColor: '#fff', // Change the heading color to white
          }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{
            title: 'audio/Video',
            headerStyle: {
              backgroundColor: '#004e92',
            },
            headerTintColor: '#fff', // Change the heading color to white
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

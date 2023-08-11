import React, { useState } from 'react'
import { StyleSheet,View,Text,TextInput, Button } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 

function CreateRoom() {

  const navigation = useNavigation();
  const [title,setTitle]=useState();
  const [description,setDescription]=useState();
  const [isActive,setActive]=useState();
  const streamsRef = firestore.collection('streams');

  streamsRef.where('isActive', '==', true).onSnapshot((querySnapshot) => {
  const activeStreams = [];
  querySnapshot.forEach((doc) => {
    const streamData = doc.data();
    activeStreams.push({
      id: doc.id,
      title: streamData.title,
      description: streamData.description,
      startTime: streamData.startTime,
      streamerId: streamData.streamerId,
    });
  })
})


  return (
    <View style={styles.container}>
    <Text style={styles.text}>please enter the title of the streame</Text>
      <TextInput
            style={styles.input}
            placeholder="title"
            autoCapitalize="none"
            onChangeText={(text) => setTitle(text)}
          /> 
        <Text>please enter the description about the streame</Text>
        <TextInput
            style={styles.input}
            placeholder="title"
            autoCapitalize="none"
            onChangeText={(text) => setDescription(text)}
          /> 
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setActive(true);
            navigation.navigate('Room')}
          }
        >
          <Text>create room</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CreateRoom;

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
  input:{
    marginVertical: 4,
    height :50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    color: 'black'
  }

})
import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <View>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Room')}}>
        <Text>Room</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
});
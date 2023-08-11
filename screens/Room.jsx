import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Card from '../component/Card';
import data from '../data/Rooms.json';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function RoomScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Card
      title={item.Room.category}
      description={item.Room.type}
      imageSource={{ uri: item.Room.imageurl }}
      navigation={navigation}
      channelName={item.Room.channelName}
      uid={item.Room.uid}
    />
  );

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
       navigation.navigate('Home', {
        isLogin: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.box}>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text>signOut</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Room.id}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004e92',
   
  },
  box:{
    padding: 10,
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5722',
    padding: 10,
    marginBottom: 10,
  },
});

export default RoomScreen;

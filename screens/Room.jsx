import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Card from '../component/Card';
import data from '../data/Rooms.json';

function RoomScreen({navigation}) {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Room.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
});

export default RoomScreen;

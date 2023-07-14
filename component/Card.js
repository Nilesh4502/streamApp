import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet,TouchableHighlight } from 'react-native';




const appId = process.env.APP_ID;


// const token = '007eJxTYLAy3hp7JD1pz0e5az+f6cd+Siiv/j/R/+vBzbklz86r7qlXYDAwME9MMzEySDY2SDYxME20NDBKNku1MDA3TkpJtjBKMji9NKUhkJHhWvouBkYoBPFZGcoyU1LzGRgAVCojEQ==';

// const channelName = 'video';

// const uid= 123454321;

const Card = ({ title, description,channelName,imageSource,navigation }) => {

  const [UUid, setUUid] = useState(Math.floor(Math.random() * 1000000));
  const [token,setToken]=useState('');
  

 

  const fetchAgoraToken=async ()=>{
    try{
      const response =await fetch(`https://agora-token-server-nx7d.onrender.com/rtc/${channelName}/publisher/uid/${UUid}`);
      const data = await response.json();
      setToken(data.rtcToken);
    }catch(e){
      console.log(e);
    }
  }
const join =async()=>{
       await fetchAgoraToken();
  if(token){
    navigation.navigate('Video',{
    channelName: channelName,
    appId: appId,
    UUid: UUid,
    token: token
    
  });
}
}





  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableHighlight style={styles.button} onPress={join}>
        <Text>Explore</Text>
      </TouchableHighlight>
      
    </View>
  );

 
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
});

export default Card;

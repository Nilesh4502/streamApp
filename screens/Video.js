import React, {useRef, useState, useEffect} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
    RtcLocalView,
    RtcRemoteView,
    AgoraVideoViewGrid
} from 'react-native-agora';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';


// const appId = 'ec54cc17ea9c44c48552738ff96cda9d'
// const channelName='video'
// const token = '006ec54cc17ea9c44c48552738ff96cda9dIABx4jDbKutLbKgqAiLBWL6J2v2pLSEji6rUowMmpXhOCSzax3xh03IJIgD/FTIzaE+tZAQAAQD4C6xkAgD4C6xkAwD4C6xkBAD4C6xk';


const VideoScreen = ({ navigation,route }) => {
    
    const { appId,token,channelName,UUid} = route.params;
    const uid = UUid;
    console.log(uid);
    console.log(appId);
    console.log(channelName);
    console.log(token);
    
    const agoraEngineRef = useRef(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [audio,SetAudio]=useState(true);
    const [cameraFacing, setCameraFacing] = useState('front');


    useEffect(() => {
         setupVideoSDKEngine();
       
        
     });
  
     
     const setupVideoSDKEngine = async () => {
        try {
            console.log(uid);
            console.log(channelName);
        // use the helper function to get permissions
        if (Platform.OS === 'android') { await getPermission()};
        agoraEngineRef.current =  createAgoraRtcEngine();
        const agoraEngine = agoraEngineRef.current;
        agoraEngine.registerEventHandler({
            onJoinChannelSuccess: () => {
                console.log('calls');
                showMessage('Successfully joined the channel ' + channelName);
                setIsJoined(true);
            },
            onUserJoined: (_connection, Uid) => {
                console.log('called');
                showMessage('Remote user joined with uid ' + Uid);
                setRemoteUid(Uid);
            },
            onUserOffline: (_connection, Uid) => {
                showMessage('Remote user left the channel. uid: ' + Uid);
                setRemoteUid(0);
            },
            onUserMuteAudio: (_connection, Uid, audio) => {
                if (Uid === remoteUid) {
                  SetAudio(!audio);
                }
              }
            
        });
        agoraEngineRef.current.setLogFilter(512);
        agoraEngine.initialize({
            appId: appId,
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });
        agoraEngine.enableVideo();
        } catch (e) {
            console.log(e);
        }
     };

     
     const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            
            
            console.log(token);
            await agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            await agoraEngineRef.current?.startPreview();
            await agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
            
        } catch (e) {
            console.log(e);
        }
    };

    
    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            navigation.navigate('Room');
            showMessage('You left the channel');
        } catch (e) {
            console.log(e);
        }
    };
    const enableAudio = async ()=>{
        try {
            await agoraEngineRef.current?.enableAudio();
            SetAudio(true);
          } catch (error) {
            console.log(error);
          }
         
    }
    const disableAudio = async ()=>{
        try {
            await agoraEngineRef.current?.disableAudio();
            SetAudio(false);
          } catch (error) {
            console.log(error);
          }
    }
    const switchCamera = async () => {
        try {
          await agoraEngineRef.current?.switchCamera();
          setCameraFacing((prevCameraFacing) =>
            prevCameraFacing === 'front' ? 'rear' : 'front'
          );
        } catch (error) {
          console.log(error);
        }
      };
      


    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.head}>join to video chat</Text>
            <View style={styles.btnContainer}>
                <Text onPress={join} style={styles.button}>
                    Join
                </Text>
                <Text onPress={leave} style={styles.button}>
                    Leave
                </Text>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined ? (
                    <React.Fragment key={0}>
                    <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
                    <Text style={{color:'black'}}>Local user uid: {uid}</Text>
                    </React.Fragment>
                ) : (
                    <Text style={{color:'black'}}>Join a channel</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <React.Fragment key={remoteUid}>
                    <RtcSurfaceView
                        canvas={{uid: remoteUid}}
                        style={styles.videoView}
                    />
                    <View style={styles.btnContainer}>
                        <Text onPress={disableAudio} style={styles.button}>
                            muteaudio
                        </Text>
                        <Text onPress={enableAudio} style={styles.button}>
                            enableaudio
                        </Text>
                    </View>
                    <Text style={{color:'black'}}>Remote user uid: {remoteUid}</Text>
                    </React.Fragment>
                ) : (
                    <Text style={{color:'black'}}>Waiting for a remote user to join</Text>
                )}
                <Text style={styles.info}>{message}</Text>
                
            <Text onPress={switchCamera} style={styles.button}>
                    Switch Camera
                    </Text>
            </ScrollView>
        </SafeAreaView>
    );
    

    function showMessage(msg) {
        setMessage(msg);
    }
};

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};


const styles = StyleSheet.create({
    button: {
        padding:10,
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 10,
        borderRadius: 10,
    },
    main: {flex: 1, alignItems: 'center'},
    scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
    scrollContainer: {alignItems: 'center'},
    videoView: {width: '95%', height: 300},
    btnContainer: {flexDirection: 'row', justifyContent: 'center' },
    head: {fontSize: 20},
    info: {backgroundColor: '#ffffe0', color: '#0000ff'}
});

export default VideoScreen;

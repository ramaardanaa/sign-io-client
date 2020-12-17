
import React, { useEffect, useState,useRef } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Colors,
  IconButton,
  TextInput,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Chatbox from "../components/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchOneRoom } from "../store/actions/action";
import socket from '../socket/socket';
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import axios from "axios";
import mime from "mime";
import * as Speech from 'expo-speech';

// Record setting for OS
const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function GroupConv({ navigation, route }) {
  const { id, code } = route.params;
  const [message, setMessage] = useState("");
  const [realtimeMessage, setRealtimeMessage] = useState([]);
  const { room, chats, loadingRoom } = useSelector((state) => state.room);
  const { access_token } = useSelector((state) => state.users);
  const { name } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [recording, setRecording] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);



  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log("error di deleterecord file");
      console.log("There was an error deleting recorded file", error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(recording.getURI());

      const type = mime.getType(uri);
      const ext = mime.getExtension(type);

      let formData = new FormData();
      formData.append("file", {
        uri: uri,
        type: type,
        name: `${Date.now()}.${ext}`,
      });
      // console.log(formData);

      const { data } = await axios.post(
        // DONT FORGET TO CHANGE THE LINK
        "http://192.168.1.143:3005/speech/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("transcript", transcript);

      sendRecordMessage(data.transcription);
    } catch (error) {
      console.log("There was an error reading file", error);
      console.log(error);
      stopRecording();
      resetRecording();
    }
    setIsFetching(false);
  };

  const startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    setIsRecording(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    const recording = new Audio.Recording();

    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log("error di start recording");
      console.log(error);
      stopRecording();
    }
    setRecording(recording);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // noop
      console.log("error di stop recording");
      console.log(error);
    }
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const handleOnPressOut = () => {
    stopRecording();
    getTranscription();
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };


  const handleBackButton = (event) => {
    event.preventDefault()
    socket.emit('disconnecting', {id: code})
    navigation.replace('DrawerNavbar',{ screen: 'GroupRoom' })
  }


  // Send Message
  const sendMessage = (event) => {
    event.preventDefault();
    const payload = {
      access_token,
      message,

      RoomId: id,
    };
    dispatch(addMessage(payload));
    Speech.speak(message, { language: "id-ID" })
    const createdAt = Date.now();
    socket.emit("sendMessage", { id: code, name, message, createdAt });
    setMessage("");
  };

  // Send Record Message
  const sendRecordMessage = (recordText) => {
    const payload = {
      access_token,
      message: recordText,
      RoomId: id,
    };
    dispatch(addMessage(payload));
    const createdAt = Date.now();
    socket.emit("sendMessage", {
      id: code,
      name,
      message: recordText,
      createdAt,
    });
    setMessage("");
  };


  useEffect(() => {
    const payload = {
      id,

      access_token
    }
    socket.connect()
    dispatch(fetchOneRoom(payload))
    socket.emit('join', code)
  }, [id])


  useEffect(() => {
    socket.on("newMessage", ({ name, message, createdAt }) => {
      // const payload = {
      //   id,
      //   access_token
      // }
      // dispatch(fetchOneRoom(payload))
      const payload = {

        User: {name}, 
        message, 
        createdAt
      }
      const newRealTime = realtimeMessage.map(el => el)
      console.log(newRealTime)
      newRealTime.push(payload)
      setRealtimeMessage(newRealTime)
    })
  }, [realtimeMessage])


  if (loadingRoom) return <Text>Loading...</Text>;


  return(
    <>
    
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Button color='#834ea8' onPress={(event) => handleBackButton(event)} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:20}} mode='text' icon={require('../assets/back.png')}/>
            <Text style={{fontFamily:'Montserratbold',fontSize:20,marginTop:15,color:'#834ea8'}}>{room.name}</Text>
          <Button color='#834ea8' onPress={() => navigation.navigate('GroupDetail',{room, code})} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/detail.png')}/>
        </View>
      <View style={{marginHorizontal:20, height:70}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          room?.members?.map(member => {
            return (
              <Avatar.Image
                key={member.id}
                size={60}
                style={styles.avatar}
                source={{ uri: member.profile_picture }}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView style={{ marginHorizontal: 20, height: "70%" }}>
        {chats.map((chat) => (
          <Chatbox key={chat.id} chat={chat} />
        ))}
        {realtimeMessage.map((chat, i) => (
          <Chatbox key={i} chat={chat} />
        ))}
      </ScrollView>

      {/* Record Button  */}
      <View style={{ alignItems: "center", marginTop: 60 }}>
        {/* <Button
            color="#a583d7"
            style={{ paddingLeft: 20 }}
            labelStyle={{ fontSize: 80 }}
            mode="text"
            icon={require("../assets/microphone.png")}
          /> */}
        
      </View>

      {/* Type area */}
      <View style={{ flexDirection: "row",padding:20,justifyContent:'center',alignItems:'center' }}>
        <TextInput
          style={{width:300,height:50}}
          onChangeText={(text) => handleMessageChange(text)}
          onSubmitEditing={(event) => sendMessage(event)}
          mode="flat"
          value={message}
        ></TextInput>
        {/* <Button onPress={(event) => sendMessage(event)} mode="contained" style={{ justifyContent: "center",height:30 }}>

          Submit
        </Button> */}
        {message === "" ? (<TouchableOpacity
          style={styles.button}
          onPressIn={startRecording}
          onPressOut={handleOnPressOut}
        >
          {isFetching && <ActivityIndicator color="#ffffff" />}
          {!isFetching && (
            <View>
              {isRecording ? (
                <Text>Recording</Text>
              ) : (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/microphone.png")}
                ></Image>
              )}
            </View>
          )}
        </TouchableOpacity>): (<TouchableOpacity onPress={(event) => sendMessage(event)}>
          <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/send.png")}
                ></Image>
        </TouchableOpacity>)}
        
      </View>
    </View>

    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  avatar: {
    marginHorizontal: 5,
  },
  chat: {
    width: 280,
    backgroundColor: "#DCE0E5",
    marginTop: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

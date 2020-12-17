import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import axios from "axios";
import mime from "mime";

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

export default function SpeechToText({ navigation }) {
  const [recording, setRecording] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);

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
        "http://192.168.2.61:3000/speech/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newData = transcript.concat(data.transcription);
      // console.log("transcript", transcript);
      // console.log("newData", newData);
      setTranscript([...newData]);
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={["#834ea8", "#a583d7", "#e2cfea"]}
          style={{
            height: 550,
            width: "100%",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingBottom: 10,
          }}
        >
          <Button
            color="white"
            onPress={() => navigation.openDrawer()}
            style={{
              width: 5,
              marginTop: 35,
              marginBottom: 10,
              marginLeft: 15,
            }}
            labelStyle={{ fontSize: 40 }}
            mode="text"
            icon={require("../assets/menu.png")}
          />
          <ScrollView>
            <View style={{ marginTop: 10, marginHorizontal: 35 }}>
              <View style={{}}>
                {/* <Text style={styles.textSpeech}>Hai Nama Saya Niko </Text>
                <Text style={styles.textSpeech}>Wow Hebat banget</Text>
                <Text style={styles.textSpeech}>Laper gan</Text>
                <Text>{transcript}</Text> */}
                {transcript?.map((record, i) => (
                  <Text style={styles.textSpeech} key={i}>
                    {record}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
        <View style={{ alignItems: "center", marginTop: 60 }}>
          {/* <Button
            color="#a583d7"
            style={{ paddingLeft: 20 }}
            labelStyle={{ fontSize: 80 }}
            mode="text"
            icon={require("../assets/microphone.png")}
          /> */}
          <TouchableOpacity
            style={styles.button}
            onPressIn={startRecording}
            onPressOut={handleOnPressOut}
          >
            {isFetching && <ActivityIndicator color="#ffffff" />}
            {!isFetching && (
              <View>
                {isRecording ? (<Text>Recording</Text>) : (<Image style={{width:70,height:70}} source={require('../assets/microphone.png')}></Image>)}
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    textAlign: "left",
  },
  textSpeech: {
    fontFamily: "Montserratbold",
    color: "#fff",
    fontSize: 30,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#1e88e5",
//     paddingVertical: 20,
//     width: "90%",
//     alignItems: "center",
//     borderRadius: 5,
//     padding: 8,
//     marginTop: 20,
//   },
//   text: {
//     color: "#fff",
//   },
// });
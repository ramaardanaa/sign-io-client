import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
// import { Audio, Permissions, FileSystem } from 'expo'
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

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingVertical: 20,
    width: "90%",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    marginTop: 20,
  },
  text: {
    color: "#fff",
  },
});

export default function SpeechToTextButton() {
  const [recording, setRecording] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

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
      console.log(formData);

      const { data } = await axios.post(
        "http://192.168.2.61:3005/speech",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscript(data);
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
      <TouchableOpacity
        style={styles.button}
        onPressIn={startRecording}
        onPressOut={handleOnPressOut}
      >
        {isFetching && <ActivityIndicator color="#ffffff" />}
        {!isFetching && (
          <Text style={styles.text}>
            {isRecording ? "Recording..." : "Start recording"}
          </Text>
        )}
      </TouchableOpacity>
      <Text>Hasil : {`${transcript}`}</Text>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import mime from "mime";
import axios from "axios";

export default function SignToText({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const isFocused = useIsFocused();
  // const [pictureSaved, setPictureSaved] = useState();
  const [result, setResult] = useState();

  let textureDims;
  if (Platform.OS === "ios") {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
  }

  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status == "granted");
    }
    getCameraStatus();
  }, []);

  const prepareRatio = async () => {
    let desiredRatio = "4:3";
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();
      console.log(ratios)
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance;

      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );

      setImagePadding(remainder / 2);
      setRatio(desiredRatio);

      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const takePicture = () => {
    if (camera) {
      camera.takePictureAsync({ onPictureSaved: onPictureSaved });
    }
  };

  const onPictureSaved = async (photo) => {
    const { uri } = photo;
    console.log(photo);
    // setPictureSaved(photo.uri);
    try {
      console.log("masuk");
      console.log("uri", uri);
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
        // "http://192.168.2.61:3000/users/upload-picture",
        "http://192.168.2.61:3000/users/upload-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("test");
      console.log("data", data);
      const { predictions } = await axios.post(
        "http://192.168.2.61:3000/sign",
        {
          url: data,
        }
      );
      console.log(predictions);
      // setResult(predictions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
            onPress={() => navigation.navigate("GroupRoom")}
            color="#9F62FF"
            style={{ width: 5, marginTop: 0, marginBottom: 10, marginLeft: 15 }}
            labelStyle={{ fontSize: 50 }}
            mode="text"
            icon={require("../assets/x.png")}
          />
      <View style={{height:450}}>
      {isFocused && (
        <Camera
          type={Camera.Constants.Type.back}
          style={[styles.cameraPreview, { marginTop: imagePadding }]}
          onCameraReady={setCameraReady}
          ratio={'1:1'}
          ref={(ref) => {
            setCamera(ref);
          }}
          // cameraTextureHeight={textureDims.height}
          // cameraTextureWidth={textureDims.width}
          // resizeHeight={200}
          // resizeWidth={152}
          // resizeDepth={3}
          // onReady={handleCameraStream}
          // autorender={true}
        >
          
        </Camera>
      )}
      </View>
      <Button
        style={{ borderRadius: 20,paddingVertical:10, marginTop:20,marginHorizontal:20 }}
        mode="contained"
        onPress={() => {
          takePicture();
        }}
      >
        Translate
      </Button>
      <Text
        label="Translated Sign"
        mode="outlined"
        style={{ marginBottom: 20 }}
      >
        {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cameraPreview: {
    flex: 1,
  },
});

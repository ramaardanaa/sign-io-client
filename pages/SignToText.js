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
import * as ImageManipulator from "expo-image-manipulator";
import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

const modelJson = require("../assets/models/model.json");
const modelWeights = require("../assets/models/model.weights.bin");

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
  const [result, setResult] = useState();
  // const [iseng, setIseng] = useState();

  // let textureDims;
  // if (Platform.OS === "ios") {
  //   textureDims = {
  //     height: 1920,
  //     width: 1080,
  //   };
  // } else {
  //   textureDims = {
  //     height: 1200,
  //     width: 1600,
  //   };
  // }

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
      // const size = await camera.getAvailablePictureSizesAsync();
      // console.log("size", size);
      console.log(ratios);
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
    console.log(photo.uri);
    // setIseng(uri);

    try {
      await tf.setBackend("rn-webgl");
      await tf.ready();
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 224, height: 224 } }],
        { format: "png" }
      );
      console.log(manipResult);
      console.log("masuk");
      console.log("uri", uri);
      const type = mime.getType(manipResult.uri);
      // const type = mime.getType(uri);
      const ext = mime.getExtension(type);

      let formData = new FormData();
      formData.append("file", {
        uri: manipResult.uri,
        // uri: uri,
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
      const hasil = await axios.post("http://192.168.2.61:3000/sign", {
        url: data.file,
      });
      console.log(hasil.data.predictions);
      setResult(hasil.data.predictions);

      // Use the bundleResorceIO IOHandler to load the model
      // const model = await tf.loadLayersModel(
      //   bundleResourceIO(modelJson, modelWeights)
      // );

      // Load an image from the web
      // const uri2 = data.file;
      // const uri2 = manipResult;
      // const imageAssetPath = Image.resolveAssetSource(uri2);
      // console.log("uri2", uri2);

      // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      // console.log("response", response);
      // const imageData = await response.arrayBuffer();
      // console.log("imageData", imageData);
      // const imageTensor = decodeJpeg(uri);
      // const imageTensor = decodeJpeg(manipResult);

      // const prediction = (await model.predict(imageTensor))[0];
      // console.log(prediction);
      // Use prediction in app
      // setResult(prediction);
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
      <View style={{ height: 450 }}>
        {isFocused && (
          <Camera
            type={Camera.Constants.Type.back}
            style={[styles.cameraPreview, { marginTop: imagePadding }]}
            onCameraReady={setCameraReady}
            ratio={"1:1"}
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
          ></Camera>
        )}
      </View>
      <Button
        style={{
          borderRadius: 20,
          paddingVertical: 10,
          marginTop: 20,
          marginHorizontal: 20,
        }}
        mode="contained"
        onPress={() => {
          takePicture();
        }}
      >
        Translate
      </Button>

      {/* Mas rama edit yg ini  */}
      {result && (
        <Text
          label="Translated Sign"
          mode="outlined"
          style={{ marginBottom: 20 }}
        >
          {result}
        </Text>
      )}
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

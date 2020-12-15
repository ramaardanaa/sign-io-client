import React,{useEffect, useState} from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity, Dimensions, Platform   } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import {  useIsFocused  } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'

export default function SignToText({navigation}){
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status == 'granted');
    }
    getCameraStatus();
  }, []);

    const prepareRatio = async () => {
    let desiredRatio = '4:3'; 
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
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

  
  const setCameraReady = async() => {
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

    return (
      <View style={styles.container}>
        {isFocused && (<Camera
          type={type}
          style={[styles.cameraPreview, {marginTop: imagePadding}]}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}>
            <Button onPress={() => navigation.navigate('GroupRoom')} color='#9F62FF' style={{width:5,marginTop:0,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:50}} mode='text' icon={require('../assets/x.png')}/>
        </Camera>)}
        <Button 
        style={{borderRadius:0}} 
        mode='contained'
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>Flip Camera</Button>
        <TextInput
      label="Translated Sign"
      mode='outlined'
      style={{marginBottom:20}}
    />
      </View>
    );
}


const styles = StyleSheet.create({
  information: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cameraPreview: {
    flex: 1,
  }
});

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner';
import {joinRoom } from '../store/actions/action';
import { addFriend} from '../store/actions/action';
import {useSelector,useDispatch} from 'react-redux'
import socket from '../socket/socket';
export default function Scan({navigation,route}) {
  const {status} = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(status);
  const access_token = useSelector((state) => state.users.access_token)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function joiningRoom(roomCode){
    const payload = {
      access_token,
      code: roomCode
    }
    dispatch(joinRoom(payload))
  }

  function addfriends(userCode) {
    const payload = {
      access_token,
      unique_code: userCode
    }
    dispatch(addFriend(payload))
  }

  async function handleBarCodeScanned ({ type, data }) {
    setScanned(true);
    data = JSON.parse(data)
    if(data.from==='rooms'){
      alert(`Join room with id ${data.code} success!`);
      joiningRoom(data.code)
      socket.emit('newJoin', code)
      navigation.goBack()
    }else if(data.from === 'friends'){
      alert(`Add Friend with id ${data.code} success!`);
      addfriends(data.code)
      navigation.goBack()
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex:1}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';
import socket from '../socket/socket';

export default function Groupbox({navigation, room}){
  const goToGroup = () => {
    navigation.navigate('GroupConv', { id:room.id, code:room.code })
    socket.emit('join', room.code)
  }

  return(
    <Card style={{borderRadius:20, marginTop:10}} onPress={() => goToGroup()}>
      <Card.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
          <Title style={{fontFamily:'Montserratbold',color:'#834ea8'}}>{room.name}</Title>
        </View>
      </Card.Content>
    </Card>
  )
}
import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';

export default function Groupbox({navigation, room}){
  return(
    <Card style={{borderRadius:20, marginTop:10}} onPress={() => navigation.navigate('GroupConv', { id:room.id, code:room.code })}>
      <Card.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
          <Title style={{fontFamily:'Montserratbold',color:'#834ea8'}}>{room.name}</Title>
          <Paragraph style={{fontFamily:'Montserrat'}}>wow ada yang baru nih</Paragraph>
        </View>
        <View style={{marginTop:18}}>
        <Avatar.Text size={24} color='white' label='1'/>
        </View>
      </Card.Content>
    </Card>
  )
}
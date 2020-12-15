import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';


export default function Friendbox(){
  return(
    <Card style={{borderRadius:20}} onPress={() => navigation.navigate('GroupConv')}>
    <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row'}}>
      <Avatar.Image size={80} source={{uri:'https://cdn.discordapp.com/avatars/748874192593879180/e98a3dd2eaeb746eafbeb3cdbfdffb8e.png?size=2048'}} />
      </View>
      <View style={{justifyContent:'center'}}>
        <Title style={{fontFamily:'Montserratbold',color:'#834ea8'}}>Yosia Elnino</Title>
        <Paragraph style={{fontFamily:'Montserrat'}}>#9087</Paragraph>
      </View>
      <View style={{justifyContent:'center'}}>
      <Button color='#9F62FF' style={{width:5,marginTop:0,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:20}} mode='text' icon={require('../assets/x.png')}/>
      </View>
    </Card.Content>
  </Card>
  )
}
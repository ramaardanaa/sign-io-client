import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';

export default function Groupbox({navigation}){
  return(
    <Card style={{borderRadius:20}} onPress={() => navigation.navigate('GroupConv')}>
      <Card.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
          <Title style={{fontFamily:'Montserratbold',color:'#834ea8'}}># Hacktiv8</Title>
          <Paragraph style={{fontFamily:'Montserrat'}}>wow ada yang baru nih</Paragraph>
        </View>
        <View style={{marginTop:18}}>
        <Avatar.Text size={24} color='white' label='1'/>
        </View>
      </Card.Content>
    </Card>
  )
}
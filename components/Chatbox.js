import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function Chatbox(props){
  const username= useSelector((state) => state.users.name)

  const getTimeAgo = (time) => {
    const timeAgo = moment(time).fromNow()
    return timeAgo
  }

  if(username === props.chat.User.name){
    return(
      <Card style={styles.chatMe}>
        <Card.Content>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Montserratbold'}}>{props.chat.User.name}</Text>
            <Text style={{fontFamily:'Montserrat',fontSize:10, marginTop:3}}>{getTimeAgo(props.chat.createdAt)}</Text>
          </View>
          <Paragraph style={{fontFamily:'Montserratlight',fontSize:15,marginTop:10}}> {props.chat.message} </Paragraph>
        </Card.Content>
      </Card>
    )
  }else{
    return(
      <Card style={styles.chat}>
        <Card.Content>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontFamily:'Montserratbold'}}>{props.chat.User.name}</Text>
            <Text style={{fontFamily:'Montserrat',fontSize:10, marginTop:3}}>{getTimeAgo(props.chat.createdAt)}</Text>
          </View>
          <Paragraph style={{fontFamily:'Montserratlight',fontSize:15,marginTop:10}}> {props.chat.message} </Paragraph>
        </Card.Content>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  chat:{
    width:280,
    backgroundColor: '#DCE0E5',
    marginTop:10,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  chatMe:{
    width:280,
    backgroundColor: '#a583d7',
    marginTop:10,
    marginLeft:80,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:0,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  }
})
import React, { useEffect, useState } from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Chatbox from '../components/Chatbox'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, fetchOneRoom } from '../store/actions/action';
import socket from '../socket/socket';

export default function GroupConv({navigation, route}){
  const {id, code} = route.params
  const [message, setMessage] = useState('')
  const [realtimeMessage, setRealtimeMessage] = useState([])
  const {room, chats, loadingRoom} = useSelector(state => state.room)
  const {access_token} = useSelector(state => state.users)
  const {name} = useSelector(state => state.users)
  const dispatch = useDispatch()

  const handleMessageChange = (text) => {
    setMessage(text)
  }

  socket.on('newMessage', ({name, message, createdAt}) => {
    // const payload = {
    //   id,
    //   access_token
    // }
    // dispatch(fetchOneRoom(payload))
    const payload = {
      name, message, createdAt
    }
    const newRealTime = realtimeMessage.map(el => el)
    newRealTime.push(payload)
    setRealtimeMessage(newRealTime)
  })

  const sendMessage = (event) => {
    event.preventDefault()
    const payload = {
      access_token,
      message,
      RoomId: id
    }
    dispatch(addMessage(payload))
    const createdAt = Date.now()
    socket.emit('sendMessage', {id: code, name, message, createdAt})
    setMessage('')
  }

  useEffect(() => {
    const payload = {
      id,
      access_token
    }
    dispatch(fetchOneRoom(payload))
    socket.connect()
    socket.emit('join', code)
  }, [id])

  useEffect(() => {
    socket.on('newMessage', ({name, message, createdAt}) => {
      // const payload = {
      //   id,
      //   access_token
      // }
      // dispatch(fetchOneRoom(payload))
      const payload = {
        name, message, createdAt
      }
      const newRealTime = realtimeMessage.map(el => el)
      newRealTime.push(payload)
      setRealtimeMessage(newRealTime)
    })
  }, [])

  if (loadingRoom) return <Text>Loading...</Text>

  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Button color='#834ea8' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
            <Text style={{fontFamily:'Montserratbold',fontSize:20,marginTop:15,color:'#834ea8'}}>{room.name}</Text>
          <Button color='#834ea8' style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/addfriend.png')}/>
        </View>
      <View style={{marginHorizontal:20, height:70}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          room?.members?.map(member => {
            return (
              <Avatar.Image key={member.id} size={60} style={styles.avatar} source={{uri: member.profile_picture}} />
            )
          })
        }
      </ScrollView>
      </View> 
        <ScrollView style={{marginHorizontal:20,height:'70%'}}>
          {
            chats.map(chat => (
              <Chatbox key={chat.id} chat={chat} />
            ))
          }
          {
            realtimeMessage.map((chat, i) => (
              <Chatbox key={i} chat={chat} />
            ))
          }
        </ScrollView>      
      <View>
        <TextInput onChangeText={(text) => handleMessageChange(text)} onSubmitEditing={(event) => sendMessage(event)} mode='outlined' value={message}></TextInput>
        <Button mode='text'></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  avatar:{
    marginHorizontal:5
  },
  chat:{
    width:280,
    backgroundColor: '#DCE0E5',
    marginTop:10,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  }
})
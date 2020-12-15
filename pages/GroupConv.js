import React, { useEffect } from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Chatbox from '../components/Chatbox'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneRoom } from '../store/actions/action';

export default function GroupConv({navigation, route}){
  const {id} = route.params
  const {room, loadingRoom} = useSelector(state => state.room)
  const {access_token} = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const payload = {
      id,
      access_token
    }
    dispatch(fetchOneRoom(payload))
  }, [id])

  if (loadingRoom) return <Text>Loading...</Text>

  return(
    <View style={styles.container}>
      <View>
      <Button color='#834ea8' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
      </View>
      <View style={{marginHorizontal:20, height:70}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          room.members.map(member => {
            return (
              <Avatar.Image key={member.id} size={60} style={styles.avatar} source={{uri: member.profile_picture}} />
            )
          })
        }
      </ScrollView>
      </View> 
        <ScrollView style={{marginHorizontal:20,height:'70%'}}>
          <Chatbox/>
        </ScrollView>      
      <View>
        <TextInput mode='outlined'></TextInput>
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
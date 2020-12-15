import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Chatbox from '../components/Chatbox'

export default function GroupConv({navigation}){
  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Button color='#834ea8' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
            <Text style={{fontFamily:'Montserratbold',fontSize:20,marginTop:15,color:'#834ea8'}}># Hacktiv8</Text>
          <Button color='#834ea8' style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/addfriend.png')}/>
        </View>
      <View style={{marginHorizontal:20, height:70}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
      <Avatar.Image size={60} style={styles.avatar} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
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
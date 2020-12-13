import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Chatbox from '../components/Chatbox'

export default function GroupConv({navigation}){
  return(
    <View style={styles.container}>
      <View>
      <Button color='black' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
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
      <View style={{marginTop:20}}>
        <ScrollView style={{marginHorizontal:20}}>
          <Chatbox/>
        </ScrollView>
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
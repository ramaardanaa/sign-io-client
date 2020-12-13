import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function GroupRoom({navigation}){
  return(
    <View style={styles.container}>
     <LinearGradient
        colors={['#834ea8','#a583d7', '#a583d7']}
        style={{height:100, borderBottomLeftRadius:20,borderBottomRightRadius:20, paddingBottom:20,flexDirection:'row',justifyContent:'space-between'}}>
        <Button color='white' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
        <Text style={{fontFamily:'Montserratbold',color:'white', fontSize:20,marginTop:40}}>Group Conversation</Text>
        <Button style={{width:5,marginTop:25,marginBottom:10,marginLeft:15}} color='white'>ok</Button>
    </LinearGradient>
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
})
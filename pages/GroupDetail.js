import React,{ useState, useEffect } from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import Friendbox from '../components/Friendbox';

export default function GroupDetail({navigation}){

  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
          <Button color='#834ea8' onPress={() => navigation.goBack()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:20}} mode='text' icon={require('../assets/back.png')}/>
        </View>
      <View style={{alignItems:'center',marginTop:0}}>
        <Text style={{fontFamily:'Montserratlight', fontSize:25, marginTop:20}}>#Hacktiv8</Text>
        <Text style={{fontFamily:'Montserratlight', fontSize:15}}>ID: 192898423</Text>
      </View>
      <View>
        {/* <Friendbox/> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  }
})
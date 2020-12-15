import React from 'react'
import { StyleSheet,Image, ScrollView,View, TextInput,Alert,Text } from 'react-native';
import { Button} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function SpeechToText({navigation}){
  return(
  <View style={styles.container}>
    <ScrollView>
     <LinearGradient
        colors={['#834ea8','#a583d7', '#e2cfea']}
        style={{height:550,width:'100%', borderBottomLeftRadius:50,borderBottomRightRadius:50, paddingBottom:10}}>
        <Button color='white' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:35,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:40}} mode='text' icon={require('../assets/menu.png')}/>
      <ScrollView>
        <View style={{marginTop:10,marginHorizontal:35}}>
          <View style={{}}>
              <Text style={styles.textSpeech}>Hai Nama Saya Niko </Text>
              <Text style={styles.textSpeech}>Wow Hebat banget</Text>
              <Text style={styles.textSpeech}>Laper gan</Text>
          </View>
        </View>
      </ScrollView>
      </LinearGradient>
      <View style={{alignItems:'center', marginTop:60}}>
        <Button color='#a583d7' style={{paddingLeft:20}} labelStyle={{fontSize:80}} mode="text" icon={require('../assets/microphone.png')}/>
      </View>
      </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    textAlign: 'left',
  },
  textSpeech:{
    fontFamily:'Montserratbold',
    color:'#fff',
    fontSize:30
  }
})
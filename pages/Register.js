import React from 'react'
import { StyleSheet,Image, ScrollView,View, TextInput,Alert,Text } from 'react-native';
import { Button } from 'react-native-paper';
import SpeechToText from 'react-native-google-speech-to-text';


export default function Register(){
  const speechToTextHandler = async () => {

    let speechToTextData = 'hello';
        try {
            speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_US');
            console.log('speechToTextData: ', speechToTextData);

        } catch (error) {
            console.log('error: ', error);
        }
}
  return(
    <ScrollView style={styles.container}>
      <View>
        <Text style={{fontFamily:'Montserratbold',fontSize:25,color:'#5E60CE'}}>Join us!</Text>
        <Text style={{fontFamily:'Montserrat',fontSize:15,color:'#929292'}}>Create your account</Text>
      </View>
      <View style={{marginTop:100}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Full Name</Text>
        <TextInput
        autoCapitalize = 'none'
        style={{ height: 40,fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Email</Text>
        <TextInput
        autoCapitalize = 'none'
        style={{ height: 40,fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Password</Text>
        <TextInput
        autoCapitalize = 'none'
        secureTextEntry
        style={{ height: 40,fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:100}}>
        <Button color='#6a4c93' onPress={speechToTextHandler} dark labelStyle={{fontFamily:'Montserrat'}} style={{borderRadius:10, paddingVertical:5}} mode="contained">Create Account</Button>
      </View>
      <View style={{marginTop:60}}>
        <Button color='#6a4c93' labelStyle={{fontFamily:'Montserratbold'}} style={{borderRadius:10,borderWidth:2, paddingVertical:5}} mode="outlined">Login</Button>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    paddingVertical:70,
    paddingHorizontal:40,
    textAlign: 'left',
  }
})
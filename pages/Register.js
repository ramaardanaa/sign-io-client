import React from 'react'
import { StyleSheet,Image, ScrollView,View, TextInput,Alert,Text } from 'react-native';
import { Button } from 'react-native-paper';
import SpeechToText from 'react-native-google-speech-to-text';
import { useState } from 'react/cjs/react.development';
import {useDispatch} from 'react-redux'
import {register} from '../store/actions/action'

export default function Register({navigation}){
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function registerHandler(){
    const payload = {
      name,
      email,
      password
    }
    dispatch(register(payload))
    navigation.navigate('Login')
  }
  return(
    <View style={styles.container}>
      <ScrollView>
      <View style={{paddingHorizontal:35,paddingBottom:70}}>
      <View>
        <Text style={{fontFamily:'Montserratbold',fontSize:25,color:'#5E60CE'}}>Join us!</Text>
        <Text style={{fontFamily:'Montserrat',fontSize:15,color:'#929292'}}>Create your account</Text>
      </View>
      <View style={{marginTop:100}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Full Name</Text>
        <TextInput
        onChangeText={(value) => setName(value) }
        autoCapitalize = 'none'
        style={{ height: 40,fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Email</Text>
        <TextInput
        onChangeText={(value) => setEmail(value) }
        autoCapitalize = 'none'
        style={{ height: 40,fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Password</Text>
        <TextInput
        onChangeText={(value) => setPassword(value) }
        autoCapitalize = 'none'
        secureTextEntry
        style={{ height: 40,fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:100}}>
        <Button color='#6a4c93' onPress={() => navigation.navigate('Login')} dark labelStyle={{fontFamily:'Montserrat'}} style={{borderRadius:10, paddingVertical:5}} mode="contained">Create Account</Button>
      </View>
      <View style={{marginTop:60}}>
        <Button color='#6a4c93' onPress={registerHandler} labelStyle={{fontFamily:'Montserratbold'}} style={{borderRadius:10,borderWidth:2, paddingVertical:5}} mode="outlined">Login</Button>
      </View>
      </View> 
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    paddingTop:70,
    textAlign: 'left',
  }
})
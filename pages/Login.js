import React,{useState} from 'react'
import { StyleSheet,Image, ScrollView,View, TextInput,Alert,Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {login} from '../store/actions/action'

export default function Login({navigation}){
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function login(){
    const payload = {
      email,
      password
    }
    dispatch(login(payload))
  }
  

  return(
    <View style={styles.container}>
      <ScrollView>
      <View style={{paddingHorizontal:35,paddingBottom:70}}>
      <View>
        <Text style={{fontFamily:'Montserratbold',fontSize:25,color:'#5E60CE'}}>Welcome Back!</Text>
        <Text style={{fontFamily:'Montserrat',fontSize:15,color:'#929292'}}>Login to continue</Text>
      </View>
      <View style={{alignItems:"center"}}>
        <Image style={{alignItems:"center", justifyContent: 'center'}} source={require('../assets/LoginPict.png')}/>
      </View>
      <View style={{marginTop:30}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Email</Text>
        <TextInput
        autoCapitalize = 'none'
        onChangeText={(value) => setEmail(value)}
        style={{ height: 40,fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'Montserrat',color:'#929292'}}>Password</Text>
        <TextInput
        autoCapitalize = 'none'
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        style={{ height: 40,fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
        />
      </View>
      <View style={{marginTop:70}}>
        <Button color='#6a4c93' onPress={() => login()} dark labelStyle={{fontFamily:'Montserrat'}} style={{borderRadius:10, paddingVertical:5}} mode="contained">Login</Button>
      </View>
      <View style={{marginTop:60}}>
        <Button color='#6a4c93'  onPress={() => navigation.navigate('Register')} labelStyle={{fontFamily:'Montserratbold'}} style={{borderRadius:10,borderWidth:2, paddingVertical:5}} mode="outlined">Create Account</Button>
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
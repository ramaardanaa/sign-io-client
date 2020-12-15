import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import {SignToText,SpeechToText,GroupConv,GroupRoom} from './index'
import React from 'react'
import {Avatar,Button} from 'react-native-paper'
import { View,Text,StyleSheet } from 'react-native';
import {useDispatch} from 'react-redux'

function CustomDrawerContent({ navigation }) {
  const dispatch = useDispatch()

  function logout(){
    dispatch({
      type:"SET_TOKEN",
      payload:''
    })
  }
  return (
    <DrawerContentScrollView>
      <View style={{justifyContent:'space-around', height:650}}>
      <View style={{alignItems:'center',marginTop:0}}>
      <Avatar.Image size={100} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
        <Text style={{fontFamily:'Montserratlight', fontSize:25, marginTop:20}}>Nikolas Stefano</Text>
      </View>
      <View>
        <Button onPress={() => navigation.navigate('ReadSign')} labelStyle={styles.nav} mode='text'>Read Sign</Button>
        <Button onPress={() => navigation.navigate('GroupRoom')}labelStyle={styles.nav} mode='text'>Group Conversation</Button>
        <Button onPress={() => navigation.navigate('SpeechToText')}labelStyle={styles.nav} mode='text'>Speech To Text</Button>
        <Button labelStyle={styles.nav} mode='text'>Setting</Button>
        <Button labelStyle={styles.nav} mode='text'>Help</Button>
      </View>
      <View style={{alignItems:'center'}}>
        <Button dark onPress={logout} color='#929292' mode='contained' style={{paddingVertical:10,width:250,borderRadius:40}}>Log out</Button>
      </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavBar(){
  const Drawer = createDrawerNavigator()
  return(
    <Drawer.Navigator
    drawerStyle={{width:'85%', borderTopRightRadius:40,borderBottomRightRadius:40}}
    drawerContent={(props) => <CustomDrawerContent {...props} />}>      
      <Drawer.Screen name="GroupRoom" component={GroupRoom} />
      <Drawer.Screen name="SpeechToText" component={SpeechToText} />
      <Drawer.Screen name="ReadSign" component={SignToText} />
      <Drawer.Screen name="GroupConv" component={GroupConv} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  nav:{
    fontFamily:'Montserrat',
    fontSize:15,
    paddingVertical:15
  }
})
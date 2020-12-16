import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import {SignToText,SpeechToText,GroupConv,GroupRoom,Setting,Friend} from './index'
import React from 'react'
import {Avatar,Button} from 'react-native-paper'
import { View,Text,StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import GroupDetail from './GroupDetail';

function CustomDrawerContent({ navigation }) {
  const {name, profile_picture, userLoading, unique_code} = useSelector(state => state.users)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch({
      type:"SET_TOKEN",
      payload:''
    })
  }

  if (userLoading) return <Text>Loading...</Text>

  return (
    <DrawerContentScrollView>
      <View style={{justifyContent:'space-around', height:650}}>
      <View style={{alignItems:'center',marginTop:0}}>
      <Avatar.Image size={100} source={{uri: profile_picture}} />
        <Text style={{fontFamily:'Montserratlight', fontSize:25, marginTop:20}}>{name}</Text>
        <Text style={{fontFamily:'Montserratlight', fontSize:15}}>{unique_code}</Text>
      </View>
      <View>
        <Button onPress={() => navigation.navigate('Friend')} labelStyle={styles.nav} mode='text'>Friends</Button>
        <Button onPress={() => navigation.navigate('GroupRoom')} labelStyle={styles.nav} mode='text'>Rooms</Button>
        <Button onPress={() => navigation.navigate('SpeechToText')} labelStyle={styles.nav} mode='text'>Speech To Text</Button>
        <Button onPress={() => navigation.navigate('ReadSign')} labelStyle={styles.nav} mode='text'>Read Sign</Button>
        <Button onPress={() => navigation.navigate('Setting')} labelStyle={styles.nav} mode='text'>Setting</Button>
      </View>
      <View style={{alignItems:'center'}}>
        <Button dark onPress={() => logout()} color='#929292' mode='contained' style={{paddingVertical:10,width:250,borderRadius:40}}>Log out</Button>
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
      <Drawer.Screen name="Setting" component={Setting}/>
      <Drawer.Screen name="Friend" component={Friend}/>
      <Drawer.Screen name="GroupDetail" component={GroupDetail}/>
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
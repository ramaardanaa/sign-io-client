import React,{ useState, useEffect } from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Friendbox from '../components/Friendbox'
import { fetchFriends } from '../store/actions/action';

export default function Friend({navigation}){
  const { friends, loadingFriends, errorFriends } = useSelector(state => state.friends)
  const { access_token } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFriends(access_token))
  }, [])

  if (loadingFriends) return <Text>Loading...</Text>

  return(
    <ScrollView style={styles.container}>
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Button color='#834ea8' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
            <Text style={{fontFamily:'Montserratbold',fontSize:20,marginTop:15,color:'#834ea8'}}>Friend List</Text>
          <Button color='#834ea8' style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/addfriend.png')}/>
        </View>
      </View>
      <View style={{padding:20}}>
        {
          friends.map(friend => {
            return (
              <Friendbox key={friend.id} friend={friend}/>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
})
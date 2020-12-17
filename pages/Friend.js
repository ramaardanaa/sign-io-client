import React,{ useState, useEffect } from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput, Portal, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Friendbox from '../components/Friendbox'
import { addFriend, fetchFriends } from '../store/actions/action';

export default function Friend({navigation}){
  const { friends, loadingFriends, errorFriends } = useSelector(state => state.friends)
  const { access_token } = useSelector(state => state.users)
  const [inviteVisible, setInviteVisible] = useState(false)
  const [userCode, setUserCode] = useState('')
  const dispatch = useDispatch()

  const hideModal2 = () => setInviteVisible(false);
  const containerStyle = {padding: 20};

  const handleUserCodeChange = (text) => {
    setUserCode(text)
    console.log(userCode)
  }

  const addingUser = (event) => {
    event.preventDefault()
    const payload = {
      access_token,
      unique_code: userCode
    }
    dispatch(addFriend(payload))
    setInviteVisible(false)
  }

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
          <Button onPress={() => setInviteVisible(true)} color='#834ea8' style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/addfriend.png')}/>
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
      <Portal>
        <Modal visible={inviteVisible} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
          <Card style={{borderRadius:20,alignItems:'center'}}>
            <Card.Actions>
              <View style={{flexDirection:'column',padding:20}}>
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{fontFamily:'Montserratbold',fontSize:20}}>Add Friends</Text>
                <TextInput onChangeText={(text) => handleUserCodeChange(text)} mode="outlined" style={{width:300,marginTop:20}} labelStyle={{fontFamily:'Montserrat'}} value={userCode}  placeholder="User Code"></TextInput>
              </View>
              <View style={{flexDirection:'row',marginTop:40,justifyContent:'flex-end'}}>
              <Button onPress={() => {
              navigation.navigate('Scan',{status:false})
              hideModal2()
              }}>Scan QRCode</Button>
              <Button onPress={(event) => addingUser(event)}>Add</Button>
              <Button onPress={() => {setInviteVisible(false)}}>Cancel</Button>
              </View>
              </View>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
})
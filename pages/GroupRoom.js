import React, {useState, useEffect} from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Button,Card, Title, Paragraph, Avatar,Modal, Portal,TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Groupbox from '../components/Groupbox'
import { useSelector, useDispatch } from 'react-redux';
import { addRoom, fetchRooms } from '../store/actions/action';

export default function GroupRoom({navigation}){
  const [visible, setVisible] = useState(false);
  const [roomName, setRoomName] = useState('')
  const {rooms, roomLoading} = useSelector(state => state.rooms)
  const {access_token} = useSelector(state => state.users)
  const dispatch = useDispatch()

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const handleRoomChange = (text) => {
    setRoomName(text)
  }

  const addingRoom = (event) => {
    event.preventDefault()
    setVisible(false)
    const payload = {
      name: roomName,
      access_token: access_token
    }
    dispatch(addRoom(payload))
  }

  useEffect(() => {
    dispatch(fetchRooms(access_token))
  }, [])

  if(roomLoading) return <Text>loading...</Text>
  
  return(
    <View style={styles.container}>
      <View>
        <LinearGradient
            colors={['#834ea8','#a583d7', '#a583d7']}
            style={{height:100, borderBottomLeftRadius:20,borderBottomRightRadius:20, paddingBottom:20,flexDirection:'row',justifyContent:'space-between'}}>
            <Button color='white' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
            <Text style={{fontFamily:'Montserratbold',color:'white', fontSize:20,marginTop:40}}>Rooms</Text>
            <Button style={{width:5,marginTop:35,marginBottom:10,marginLeft:15}} labelStyle={{fontSize:20}} color='white' mode='text' icon={require('../assets/search.png')}></Button>
        </LinearGradient>
        <View style={{marginTop:20, paddingHorizontal:15}}>
          {
            rooms?.map(room => {
              return (
                <Groupbox key={room.id} navigation={navigation} room={room} />      
              )
            })
          } 
        </View>
      </View>
      <View style={{alignItems:'flex-end'}}>
        <Button mode='text' labelStyle={{fontSize:40}} style={{width:10, alignItems:'center'}} onPress={showModal} icon={require('../assets/add.png')}/>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Card style={{borderRadius:20,alignItems:'center'}}>
          <Card.Actions>
            <View style={{flexDirection:'column',padding:20}}>
            <View style={{flexDirection:'column'}}>
              <Text style={{fontFamily:'Montserratbold',fontSize:20}}>Create Group Conversation</Text>
              <TextInput mode="outlined" labelStyle={{fontFamily:'Montserrat'}} value={roomName} onChangeText={(text) => handleRoomChange(text)} placeholder="..."></TextInput>
            </View>
            <View style={{flexDirection:'row',marginTop:40,justifyContent:'flex-end'}}>
            <Button onPress={event => addingRoom(event)}>Ok</Button>
            <Button onPress={() => {setVisible(false)}}>Cancel</Button>
            </View>
            </View>
          </Card.Actions>
        </Card>
        </Modal>
      </Portal>
    </View>
  ) 

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between'
  },
})
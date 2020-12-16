import React,{useState,useEffect} from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import mime from "mime";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/actions/action';


export default function Setting({navigation}){
  const [edit,setEdit] = useState(false)
  const {name, profile_picture, access_token} = useSelector(state => state.users)
  const [image, setImage] = useState('')
  const [newImg, setImg] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
        maxWidth: 500,
        maxHeight: 500
      });
    
      if (!result.cancelled) {
        const uri = result.uri

        // console.log(uri, 'ini uri')
  
        const type = mime.getType(uri);
        const ext = mime.getExtension(type);
  
        let formData = new FormData();
        formData.append("file", {
          uri: uri,
          type: type,
          name: `${Date.now()}.${ext}`,
        });
        // console.log(formData, 'ini formdata');
  
        const { data } = await axios.post(
          "http://192.168.100.6:3000/users/upload-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data)
        setImg(data.file)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleNameChange = (text) => {
    dispatch({
      type: 'SET_NAME',
      payload: text
    })
    console.log(name)
  }

  const submitEdit = () => {
    const payload = {
      access_token,
      name,
      profile_picture: newImg
    }
    dispatch(updateUser(payload))
  }

  return(
    <ScrollView style={styles.container}>
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Button color='#834ea8' onPress={() => navigation.openDrawer()} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/menu.png')}/>
            <Text style={{fontFamily:'Montserratbold',fontSize:20,marginTop:15,color:'#834ea8'}}>Profile Setting</Text>
          <Button color='#834ea8' onPress={edit? () => setEdit(false) : () => setEdit(true)} style={{width:5,marginTop:25,marginBottom:5,marginLeft:15}} labelStyle={{fontSize:30}} mode='text' icon={require('../assets/edit.png')}/>
        </View>
        <View style={{alignItems:'center',marginTop:30}}>
          {edit? (
          <TouchableOpacity onPress={pickImage}> 
            <Avatar.Image size={100} source={{uri: newImg? newImg : profile_picture}} />
          </TouchableOpacity>) : (
          <TouchableOpacity> 
            <Avatar.Image size={100} source={{uri: profile_picture}} />
          </TouchableOpacity>)}
          
        </View>
      </View>
      <View style={{paddingHorizontal:40, marginTop:40}}>
        <View>
          <Text style={{fontFamily:'Montserrat',color:'black',fontSize:20}}>Full Name</Text>
          <TextInput
          disabled={edit ? false : true}
          autoCapitalize = 'none'
          style={{ height: 40,backgroundColor:'#f2f2f2' ,fontFamily:'Montserrat',fontSize:17, borderColor: 'gray',borderBottomWidth:1 }}
          value={name}
          onChangeText={(text) => handleNameChange(text)}
          // mode={edit ? 'outlined' : 'flat'}
          />
        </View>
        <View style={{marginTop:50}}>
          <Text style={{fontFamily:'Montserrat',color:'black',fontSize:20}}>Email</Text>
          <TextInput
          disabled={edit ? false : true}
          autoCapitalize = 'none'
          style={{ height: 40,backgroundColor:'#f2f2f2',fontFamily:'Montserrat',fontSize:15, borderColor: 'gray',borderBottomWidth:1 }}
          value="nikolas@mail.com"
          // mode={edit ? 'outlined' : 'flat'}
          />
        </View>
        <View style={{marginTop:50}}>
          <Text style={{fontFamily:'Montserrat',color:'black',fontSize:20}}>Password</Text>
          <TextInput
          disabled={edit ? false : true}
          autoCapitalize = 'none'
          secureTextEntry
          style={{ height: 40,fontSize:15,backgroundColor:'#f2f2f2', borderColor: 'gray',borderBottomWidth:1 }}
          value="goodluck"
          // mode={edit ? 'outlined' : 'flat'}
          />
        </View>
      </View>
      <View style={{marginTop:20,paddingHorizontal:40}}>
        {edit? <Button onPress={() => submitEdit()} style={{paddingVertical:10,borderRadius:20}} mode='contained' >Save</Button> : <Text style={{paddingVertical:19,color:"#f2f2f2"}}>.</Text>}
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
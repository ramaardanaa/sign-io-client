import React,{useState,useEffect} from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


export default function Setting({navigation}){
  const [edit,setEdit] = useState(false)
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
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
            <Avatar.Image size={100} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
          </TouchableOpacity>) : (
          <TouchableOpacity> 
            <Avatar.Image size={100} source={{uri:'https://cdn.discordapp.com/avatars/245906962716426250/57f763137784746812bd19d48987ad99.png?size=2048'}} />
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
          value="Nikolas Stefano"
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
        {edit? <Button style={{paddingVertical:10,borderRadius:20}} mode='contained' >Save</Button> : <Text style={{paddingVertical:19,color:"#f2f2f2"}}>.</Text>}
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
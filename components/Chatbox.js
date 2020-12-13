import React from 'react'
import { StyleSheet,Image, ScrollView,View,Text, TouchableOpacity  } from 'react-native';
import { Avatar,Button,Card, Title, Paragraph } from 'react-native-paper';

export default function Chatbox(){
  return(
    <Card style={styles.chat}>
      <Card.Content>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontFamily:'Montserratbold'}}>Rama</Text>
          <Text style={{fontFamily:'Montserrat',fontSize:10, marginTop:3}}>5 minutes ago</Text>
        </View>
        <Paragraph style={{fontFamily:'Montserratlight',fontSize:15,marginTop:10}}>Aku tadi liat film bagus banget tapi gatau kalian mau liat atau nggak </Paragraph>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  chat:{
    width:280,
    backgroundColor: '#DCE0E5',
    marginTop:10,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  }
})
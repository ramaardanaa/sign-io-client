import React from 'react'
import {createStackNavigator} from  '@react-navigation/stack'
import {useSelector} from 'react-redux'
import {Login,Register, SpeechToText,SignToText,DrawerNavbar} from './pages/'
export default function Navigation({navigation}){
  const {access_token} = useSelector((state) => state.users)
  const Stack = createStackNavigator() 
  return(
    <>
    <Stack.Navigator>
    {access_token ? (
      <>
      <Stack.Screen name="DrawerNavbar" component={DrawerNavbar} options={{headerShown:false}}/>
      </>
    ) : (
      <>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      </>
    )} 
    </Stack.Navigator>
    </> 
  )
}
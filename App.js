import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Login,Register} from './pages/'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from  '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [loaded] = Font.useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    Montserratbold: require('./assets/fonts/Montserrat-Bold.ttf'),
    Montserratlight: require('./assets/fonts/Montserrat-Light.ttf')
  });

  if (!loaded) {
    return null;
  }
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
    <PaperProvider>
      <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/> */}
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Game" component={GameBoard}/>
      <Stack.Screen name="Finish" component={Finish}/>
      <Stack.Screen name="Leaderboard" component={LeaderBoard}/> */}
      </Stack.Navigator>
    </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

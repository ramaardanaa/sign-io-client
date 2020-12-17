import * as Font from "expo-font";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import {
  Login,
  Register,
  SpeechToText,
  SignToText,
  DrawerNavbar,
} from "./pages/";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./store/index";
import Navigation from "./Navigation"
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  const [loaded] = Font.useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    Montserratbold: require("./assets/fonts/Montserrat-Bold.ttf"),
    Montserratlight: require("./assets/fonts/Montserrat-Light.ttf"),
  });
  const Stack = createStackNavigator();

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

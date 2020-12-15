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
  const access_token = "a";
  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <Stack.Navigator>
            {access_token ? (
              <>
                <Stack.Screen
                  name="DrawerNavbar"
                  component={DrawerNavbar}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
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

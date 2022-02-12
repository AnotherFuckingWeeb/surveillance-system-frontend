import React, { useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { Welcome } from "../screens/Welcome";
import { Dashboard } from "../screens/Dashboard";
import { AddCamera } from "../screens/AddCamera";
import { AddUser } from "../screens/AddUser";
import { CameraInfo } from "../screens/CameraInfo";
import { UserInfo } from "../screens/UserInfo";
import { Cameras } from "../screens/Cameras";
import { Users } from "../screens/Users";
import { Splash } from "../screens/Splash";
import { SucessAccount } from "../screens/SucessAccount";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const StackTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const options: StackNavigationOptions = {
  headerShown: false,
};

export const Route = () => {
  return (
    <NavigationContainer theme={StackTheme}>
      <Stack.Navigator screenOptions={options} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddCamera" component={AddCamera} />
        <Stack.Screen name="CameraInfo" component={CameraInfo} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Cameras" component={Cameras} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="SucessAccount" component={SucessAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

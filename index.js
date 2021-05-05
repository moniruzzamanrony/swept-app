import { AppRegistry, AsyncStorage } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import axios from "axios";
import { Api } from "./src/contants/Api";
import React from "react";

AppRegistry.registerComponent(appName, () => App);


const interceptor = async (key) => {
  try {
    const name = await AsyncStorage.getItem("token");
    // Interceptor
    axios.interceptors.request.use(request => {

      request.headers.Authorization = Api.TOKEN_TYPE + " " + name;
      return request;
    });
  } catch (e) {
    console.log(e);
  }
}

interceptor();


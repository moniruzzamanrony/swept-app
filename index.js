import { AppRegistry, AsyncStorage } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import axios from "axios";
import { Api } from "./src/contants/Api";
import React from "react";

AppRegistry.registerComponent(appName, () => App);


const interceptor = async (key) => {
  try {

    // Interceptor
    axios.interceptors.request.use(async request => {

      request.headers.Authorization = Api.TOKEN_TYPE + " " + await AsyncStorage.getItem("token");
      return request;
    });
  } catch (e) {
    console.log(e);
  }
}

interceptor();


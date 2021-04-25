import { AppRegistry, AsyncStorage } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import axios from "axios";
import { Api } from "./src/contants/Api";

AppRegistry.registerComponent(appName, () => App);

// Interceptor
axios.interceptors.request.use(request => {
  const token = getToken("token");
  if (token === "") {
    console.log("Token not found");
  } else {
    request.headers.Authorization = Api.TOKEN_TYPE + " " + token;
  }
  return request;
});

const getToken = async (key) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (e) {
    console.log(e);
  }
};


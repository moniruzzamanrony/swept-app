import axios from "axios";
import { AsyncStorage } from "react-native";
import { Api } from "../contants/Api";

export default () => {

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
      const name = await AsyncStorage.getItem(key);
      return name;
    } catch (e) {
      console.log(e);
    }
  };
};



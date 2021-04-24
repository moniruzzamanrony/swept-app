import React from "react";
import { AsyncStorage, Image, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import { Text } from "react-native-elements";
import { Api } from "../contants/Api";
import axios from "axios";


const LoginScreen = (props) => {
  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState(false);

  const login = () => {
    if (email === "" || password == "") {
      setEmailErr(true);
      setPasswordErr(true);
    }

    const body = {
      "email": email,
      "password": password,
    };
    axios.post(Api.BASE_URL + Api.LOGIN, body)
      .then(function(response) {
        console.log(response);
        setToken("token", response.data.access_token);

        console.log("login successful");
      })
      .catch(function(error) {
        console.log(error);
      });

  };
  const setToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  function gotoSignUpPage() {
    props.navigation.navigate("SignUpScreen");
  }

  return (
    <View style={style.body}>
      <View>
        <Image style={{ margin: 30 }} source={require("../../assets/logo/logo.png")} />
      </View>

      <View>
        <Text h3 style={{ marginBottom: 10, marginLeft: 5 }}>Login</Text>
        <Text style={{ margin: 5 }}>Email</Text>
        <TextInput style={style.inputField} onChangeText={email => setEmail(email)} />
        {emailErr ? <Text style={style.errorMessage}>Invalid Email</Text> : null}
        <Text style={{ margin: 5 }}>Password</Text>
        <TextInput style={style.inputField} onChangeText={password => setPassword(password)} />
        {passwordErr ? <Text style={style.errorMessage}>Password more then 6 Character</Text> : null}

      </View>
      <View>
        <Button style={style.getStartBut} onPress={function() {
          login();
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Log in</Text>
        </Button>
        <Text style={{ margin: 8 }} onPress={function() {
          gotoSignUpPage();
        }}>Don’t have any account? <Text style={{ fontWeight: "bold" }}> Sign up</Text></Text>
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.baseBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    backgroundColor: colors.white,
    width: 350,
    height: 54,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.offWhite,
  },
  getStartBut: {
    width: 292,
    height: 60,
    marginTop: 30,
    backgroundColor: colors.buttonBgColor,
    color: colors.black,
    borderRadius: 9,
    justifyContent: "center",
  },
  errorMessage: {
    fontSize: 11,
    color: colors.offRed,
    margin: 2,
  },
});
export default LoginScreen;

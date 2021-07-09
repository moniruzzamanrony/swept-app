import React, { useState } from "react";
import { AsyncStorage, Image, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import { Text } from "react-native-elements";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";


const LoginScreen = (props) => {
  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const login = async () => {

    if (email === "" || password == "") {
      setEmailErr(true);
      setPasswordErr(true);
    }

    const body = {
      "email": email,
      "password": password,
    };

    // Show Loader
    setLoading(true);

    axios.post(Api.BASE_URL + Api.LOGIN, body)
      .then(function(response) {

        //Set Token
        AsyncStorage.setItem("token", response.data.access_token);

        //Navigate to Home Screen
        props.navigation.navigate("DashboardScreen");

        //Save Login Info
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);

        // Hide Loader
        setLoading(false);
      })
      .catch(function(error) {
        // Log show
        console.log(error);

        Toast.show({
          text: "Wrong password!",
          buttonText: "Okay",
          type: "danger",
        });

        // Hide Loader
        setLoading(false);
      });
    const name = await AsyncStorage.getItem("token");
    console.log("Login---->" + name);
  };


  function gotoSignUpPage() {
    props.navigation.navigate("SignUpScreen");
  }

  function forgetPassword() {
    props.navigation.navigate("ResetPasswordScreen");
  }

  return (
    <Root>
      {/* Loading Screen Start*/}
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        textStyle={{ color: colors.buttonBgColor }}
      />
      {/* Loading Screen End*/}

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
          <TextInput secureTextEntry={true} style={style.inputField} onChangeText={password => setPassword(password)} />
          {passwordErr ? <Text style={style.errorMessage}>Password more then 6 Character</Text> : null}
          <Text style={{ margin: 5 }} onPress={function() {
            forgetPassword();
          }}>Forgot Password?</Text>
        </View>
        <View>
          <Button style={style.getStartBut} onPress={function() {
            login();
            //Navigate to Home Screen
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Log in</Text>
          </Button>
          <Text style={{ margin: 8 }} onPress={function() {
            gotoSignUpPage();
          }}>Don’t have any account? <Text style={{ fontWeight: "bold" }}> Sign up</Text></Text>
        </View>
      </View>
    </Root>
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
    color: colors.black,
    width: 350,
    height: 54,
    borderRadius: 8,
    padding: 10,
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

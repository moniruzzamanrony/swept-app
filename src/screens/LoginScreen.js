import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import { Text } from "react-native-elements";

const LoginScreen = (props) => {
  const login = () => {

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
        <TextInput style={style.inputField} />
        <Text style={{ margin: 5 }}>Password</Text>
        <TextInput style={style.inputField} />
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
});
export default LoginScreen;

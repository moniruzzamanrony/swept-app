import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NavigationHeader from "../navigation/NavigationHeader";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";

const NewPasswordSetupScreen = (props) => {

  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState(false);
  const [reTypePassword, setReTypePassword] = React.useState("");
  const [reTypePasswordErr, setReTypePasswordErr] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    if (password === "") {
      setPasswordErr(true);
    }
    if (reTypePassword === "") {
      setReTypePasswordErr(true);
    } else {
      const body = {
        "email": props.route.params.email,
        "password": password,
        "password_confirmation": reTypePassword,
      };
      // Show Loader
      setLoading(true);
      axios.post(Api.BASE_URL + Api.RESET_PASSWORD, body)
        .then(function(response) {
          console.log(response);
          //Navigate to Home Screen
          props.navigation.navigate("LoginScreen");
          // Hide Loader
          setLoading(false);
        })
        .catch(function(error) {
          console.log(error);
          Toast.show({
            text: "Something Wrong!",
            buttonText: "Okay",
            type: "danger",
          });

          // Hide Loader
          setLoading(false);
        });
    }
  };

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
      <View style={style.body}>
        {/*------Header-----*/}
        <NavigationHeader title="Reset Password" url="LoginScreen" />
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Password</Text>
          <TextInput style={style.inputField} placeholder="8-20 characters"
                     onChangeText={password => setPassword(password)} />
          {reTypePasswordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}
        </View>
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Re-enter Password</Text>
          <TextInput style={style.inputField} placeholder="6-20 characters"
                     onChangeText={reTypePassword => setReTypePassword(reTypePassword)} />
          {reTypePasswordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}
        </View>
        <View style={style.buttomBut}>
          <Button style={style.getStartBut} onPress={function() {
            resetPassword();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Reset Password</Text>
          </Button>
        </View>
      </View>
    </Root>
  );
};
const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.baseBackgroundColor,
  },
  inputField: {
    backgroundColor: colors.white,
    width: 350,
    padding: 10,
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
  },
  buttomBut: {
    marginLeft: 60,

  },
  formDiv: {
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 10,

  },

});
export default NewPasswordSetupScreen;

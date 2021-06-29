import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import NavigationHeader from "../navigation/NavigationHeader";
import { Button, Root, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";

const SignUpScreen = (props) => {
  const [name, setName] = React.useState("");
  const [nameErr, setNameErr] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [phoneErr, setPhoneErr] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [addressErr, setAddressErr] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState(false);
  const [reTypePassword, setReTypePassword] = React.useState("");
  const [reTypePasswordErr, setReTypePasswordErr] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const gotoSignUpPage = () => {
    if (name === "") {
      setNameErr(true);
    }
    if (email === "") {
      setEmailErr(true);
    }
    if (phone === "") {
      setPasswordErr(true);
    }
    if (address === "") {
      setAddressErr(true);
    }
    if (password === "") {
      setPasswordErr(true);
    }
    if (reTypePassword === "") {
      setReTypePasswordErr(true);
    } else {
      const body = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone,
        "address": address,
      };
      // Show Loader
      setLoading(true);
      axios.post(Api.BASE_URL + Api.SIGN_UP, body)
        .then(function(response) {
          console.log(response);
          //Navigate to Home Screen
          props.navigation.navigate("LoginScreen");

          // Hide Loader
          setLoading(false);
        })
        .catch(function(error) {
          // Log show
          console.log(error);

          Toast.show({
            text: error.response.data.Error.email[0],
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
      <View style={style.body}>
        {/* Loading Screen Start*/}
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          textStyle={{ color: colors.buttonBgColor }}
        />
        {/* Loading Screen End*/}

        {/*------Header-----*/}
        <NavigationHeader title="Sign Up" url="LoginScreen" navigation={props} />
        {/*Input Field*/}
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Name</Text>
          <TextInput style={style.inputField} onChangeText={name => setName(name)} />
          {nameErr ? <Text style={style.errorMessage}>Name required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Email</Text>
          <TextInput style={style.inputField} onChangeText={phoneOrEmail => setEmail(phoneOrEmail)} />
          {emailErr ? <Text style={style.errorMessage}>Email required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Phone No.</Text>
          <TextInput style={style.inputField} onChangeText={phone => setPhone(phone)} />
          {phoneErr ? <Text style={style.errorMessage}>Phone No. required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Address</Text>
          <TextInput style={style.inputField} onChangeText={address => setAddress(address)} />
          {addressErr ? <Text style={style.errorMessage}>Address required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Password</Text>
          <TextInput style={style.inputField} onChangeText={password => setPassword(password)}
                     placeholder="6-20 characters" />
          {passwordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Re-enter Password</Text>
          <TextInput style={style.inputField} onChangeText={reTypePassword => setReTypePassword(reTypePassword)}
                     placeholder="6-20 characters" />
          {reTypePasswordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}
        </View>

        <View style={style.buttomBut}>
          <Button style={style.getStartBut} onPress={function() {
            gotoSignUpPage();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Sign Up</Text>
          </Button>
          <Text style={{ margin: 8 }} onPress={function() {

          }}>Already have an account? <Text style={{ fontWeight: "bold" }}> Login</Text></Text>
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
    height: 54,
    borderRadius: 8,
    borderWidth: 2,
    padding: 10,
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
export default SignUpScreen;

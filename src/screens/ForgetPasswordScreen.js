import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import NavigationHeader from "../navigation/NavigationHeader";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";

const ForgetPasswordScreen = (props) => {

  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) + 50);

  const setVerificationCode = () => {
    /*--- Validation---*/
    if (email === "") {
      setEmailErr(true);
    } else {

      /*--- JSON Body*/
      const body = {
        "email": email,
      };

      /*--- Http Request -----*/
      setLoading(true);
      axios.post(Api.BASE_URL + Api.FORGET_PASSWORD, body)
        .then(function(response) {
          console.log(response);
          //Navigate to Next Screen
          props.navigation.navigate("CodeVerificationScreen", {
            "email": email,
          });

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
  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    inputField: {
      backgroundColor: colors.white,
      width: width,
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
        <NavigationHeader title="Reset Password" url="LoginScreen" navigation={props} />
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Email</Text>
          <TextInput style={style.inputField} onChangeText={email => setEmail(email)} />
          {emailErr ? <Text style={style.errorMessage}>Invalid Email</Text> : null}
        </View>

        <View style={style.buttomBut}>
          <Button style={style.getStartBut} onPress={function() {
            setVerificationCode();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Send Code</Text>
          </Button>
        </View>
      </View>
    </Root>
  );
};

export default ForgetPasswordScreen;

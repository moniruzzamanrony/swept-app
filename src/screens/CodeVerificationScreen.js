import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NavigationHeader from "../navigation/NavigationHeader";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";

const CodeVerificationScreen = (props) => {
  const [code, setCode] = React.useState("");
  const [codeErr, setCodeErr] = React.useState("");
  const [loading, setLoading] = useState(false);

  const newPasswordSetup = () => {

    console.log();
    /*--- JSON Body*/
    const requestBody = {
      "email": props.route.params.email,
      "token": code,
    };

    /*--- Http Request -----*/
    setLoading(true);
    axios.post(Api.BASE_URL + Api.VERIFY_CODE, requestBody)
      .then(function(response) {
        console.log(response);
        //Navigate to Next Screen
        props.navigation.navigate("NewPasswordSetupScreen", {
          "email": props.route.params.email,
        });

        // Hide Loader
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        Toast.show({
          text: "Invalid Code!",
          buttonText: "Okay",
          type: "danger",
        });
        // Hide Loader
        setLoading(false);
      });



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
        <NavigationHeader title="Verify Now" url="ResetPasswordScreen" navigation={props} />
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Code</Text>
          <TextInput style={style.inputField} onChangeText={code => setCode(code)} />
          {codeErr ? <Text style={style.errorMessage}>Invalid Code</Text> : null}
        </View>

        <View style={style.buttomBut}>
          <Button style={style.getStartBut} onPress={function() {
            newPasswordSetup();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Submit</Text>
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
  }, inputField: {
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
export default CodeVerificationScreen;

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NavigationHeader from "../navigation/NavigationHeader";
import { colors } from "../theme/Colors";
import { Button } from "native-base";

const NewPasswordSetupScreen = (props) => {
  return (
    <View style={style.body}>
      {/*------Header-----*/}
      <NavigationHeader title="Reset Password" url="LoginScreen" />
      <View style={style.formDiv}>
        <Text style={{ margin: 2 }}>Password</Text>
        <TextInput style={style.inputField} placeholder="6-20 characters" />
        {/*{reTypePasswordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}*/}
      </View>
      <View style={style.formDiv}>
        <Text style={{ margin: 2 }}>Re-enter Password</Text>
        <TextInput style={style.inputField} placeholder="6-20 characters" />
        {/*{reTypePasswordErr ? <Text style={style.errorMessage}>Password more then 6-20 characters</Text> : null}*/}
      </View>
      <View style={style.buttomBut}>
        <Button style={style.getStartBut} onPress={function() {

        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Reset Password</Text>
        </Button>
      </View>
    </View>

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
export default NewPasswordSetupScreen;
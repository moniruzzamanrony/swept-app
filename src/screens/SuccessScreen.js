import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button } from "native-base";

const SuccessScreen = (props) => {
  const gotoLoginPage = () => {
    props.navigation.navigate("DashboardScreen");
  };
  return (
    <View style={style.body}>
      <Image style={{ margin: 20 }} source={require("../../assets/icons/success_icon.png")} />
      <Text style={style.subTitle}>You places your order</Text>
      <Text style={style.subTitle}>Succesfully</Text>
      <View>
        <Button style={style.getStartBut} onPress={function() {
          gotoLoginPage();
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Back to Home</Text>
        </Button>
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
  subTitle: {
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "bold",
    padding: 0.04,
    fontStyle: "normal",
    color: colors.deepWhite,
    textAlign: "center",
    textTransform: "uppercase",
  },
  getStartBut: {
    width: 292,
    height: 60,
    marginTop: 50,
    backgroundColor: colors.buttonBgColor,
    color: colors.black,
    borderRadius: 9,
    justifyContent: "center",
  },
});
export default SuccessScreen;

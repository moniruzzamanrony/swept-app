import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button, Icon } from "native-base";

const SplashScreen = () => {
  return (
    <View style={style.body}>
      <Image style={{ margin: 20 }} source={require("../../assets/logo/logo.png")} />
      <Text style={style.subTitle}>GEt ready to make</Text>
      <Text style={style.subTitle}>your life easy</Text>
      <View>
        <Button style={style.getStartBut}>
          <Text style={{ fontSize: 18, marginRight: 7, fontWeight: "bold" }}>Get Started</Text>
          <Icon name="arrow-forward" />
        </Button>
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "Poppins",
    fontSize: 18,
    padding: 0.04,
    fontStyle: "normal",
    color: colors.deepWhite,
    textAlign: "center",
    textTransform: "uppercase",
  },
  getStartBut: {
    width: 292,
    height: 60,
    padding: 10,
    marginTop: 50,
    backgroundColor: colors.buttonBgColor,
    color: colors.black,
    borderRadius: 9,
    justifyContent: "center",
  },
});
export default SplashScreen;

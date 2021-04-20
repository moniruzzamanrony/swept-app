import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button, Icon } from "native-base";

const SplashScreen = (props) => {

  const gotoLoginPage = () => {
    props.navigation.navigate("LoginScreen");
  };

  return (
    <View style={style.body}>
      <Image style={{ margin: 20 }} source={require("../../assets/logo/logo.png")} />
      <Text style={style.subTitle}>Get ready to make</Text>
      <Text style={style.subTitle}>your life easy</Text>
      <View>
        <Button style={style.getStartBut} onPress={function() {
          gotoLoginPage();
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Get Started</Text>
          <Icon name="arrow-forward" style={{ fontSize: 20, color: colors.black }} />
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
export default SplashScreen;

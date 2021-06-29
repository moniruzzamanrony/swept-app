import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { colors } from "../theme/Colors";

const NavigationHeaderWithOutBack = (props) => {

  return (
    <View style={style.body}>
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  body: {
    backgroundColor: colors.baseBackgroundColor,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
  },
  title: {
    width: 320,
    fontSize: 20,
    color: colors.black,
    textAlign: "center",
    margin: 5,
    fontWeight: "bold",
  },
});
export default NavigationHeaderWithOutBack;

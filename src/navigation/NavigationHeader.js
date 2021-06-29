import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "native-base";
import { colors } from "../theme/Colors";

const NavigationHeader = (props) => {

  const back = () => {
    props.navigation.navigation.navigate(props.url);
  };
  return (
    <View style={style.body}>
      <TouchableOpacity
        onPress={function() {
          back();
        }}
        style={style.roundButton}>
        <Icon name="arrow-back" style={{ fontSize: 25, color: colors.black }} />
      </TouchableOpacity>

      <Text style={style.title}>{props.title}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  body: {
    backgroundColor: colors.baseBackgroundColor,
    padding: 30,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    color: colors.black,
    textAlign: "center",
    paddingLeft: 70,
    marginTop: 15,
    fontWeight: "bold",
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,0.62)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: colors.white,
  },
});
export default NavigationHeader;

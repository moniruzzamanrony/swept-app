import React, {useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import { Icon, Text } from "native-base";
import { colors } from "../theme/Colors";

const NavigationHeader = (props) => {
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) + 50);

  const back = () => {
    props.navigation.navigation.navigate(props.url);
  };
  const style = StyleSheet.create({
    body: {
      backgroundColor: colors.white,
      padding: 8,
      marginTop: 15,
      borderRadius: 5,
      flexDirection: "row",
    },
    title: {
      fontSize: 20,
      color: colors.black,
      flex: 1,
      marginLeft: widthHalf/2,
      marginTop: 10,
      fontWeight: "bold",
    },
    roundButton: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",

      borderRadius: 100,
      shadowColor: "rgba(0,0,0,0.62)",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      backgroundColor: colors.buttonBgColor,
    },
  });
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

export default NavigationHeader;

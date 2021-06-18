import React from "react";
import { View } from "native-base";
import NavigationBar from "../navigation/NavigationBar";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/Colors";
import Text from "react-native-paper/src/components/Typography/Text";

const PersonalItemScreen = () => {
  return (
    <View>
      {/* ---- Header ------*/}
      <NavigationBar title="Personal Items" url="Personal Items" />
      {/*---- Main Card Body ------*/}
      <View style={{ margin: 20 }}>

        {/*--- Row 2*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Pet Care Card----*/}
          <TouchableOpacity onPress={function() {

          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../assets/icons/personal_item.png")}
                style={{ height: 60, width: 60 }}
              />
              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Pet Care</Text>
            </View>
          </TouchableOpacity>
          {/*----- concierge -----*/}
          <TouchableOpacity onPress={function() {

          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../assets/icons/personal_item.png")}
                style={{ height: 60, width: 60 }}
              />
              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Concierge</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};
const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.baseBackgroundColor,
  },
  header: {
    backgroundColor: colors.white,
    height: 139,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    flexDirection: "row",
  },
  headerTitle: {
    marginTop: 69,
    marginLeft: 30,
    marginBottom: 18,

  },
  headerAvatar: {
    width: 150,
    marginTop: 69,
    marginBottom: 18,

  },
  cardStyle: {
    width: 168,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 10,
    borderColor: colors.cardNonSelectedBorderColor,
  },
  inputField: {
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
    margin: 2,
  },
});
export default PersonalItemScreen;
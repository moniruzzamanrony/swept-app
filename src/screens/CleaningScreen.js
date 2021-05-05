import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";


const CleaningScreen = () => {
  //const [titleOfType, setTitleOfType] = React.useState("");

  return (
    <View>
      {/* ---- Header ------*/}
      <NavigationBar title="Cleaning" url="LoginScreen" />
      {/* ---- Selection Part ----- */}
      <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 25, marginTop: 25 }}>Tell Us About Your House </Text>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>

          {/*--- Cleaning Card----*/}
          <TouchableOpacity onPress={function() {
          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../assets/icons/building_icon.png")}
                style={{ height: 60, width: 60 }}
              />
              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Apartment/
                Townhome</Text>
            </View>
          </TouchableOpacity>
          {/*--- Handyman Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../assets/icons/home_icon.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Condo/
              House</Text>
          </View>
        </View>
      </View>

      {/* ---- Cleaning Type ----- */}
      <Text style={style.cardHeaderTextStyle}> Apartment/Townhome Type </Text>
      <View style={{ alignItems: "center" }}>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>

          <ScrollView horizontal={true} style={{ marginLeft: 25 }}>

            {/*--- Type 1 Card----*/}
            <TouchableOpacity onPress={function() {
              gotoCleaningScreen();
            }}>
              <View style={style.cardStyleForTypeSelection}>
                <Text style={style.cardTextStyle}> 1-2 BR </Text>
                <Text style={style.cardTextStyle}> $69 </Text>
              </View>
            </TouchableOpacity>

            {/*---  Type 2 Card----*/}
            <View style={style.cardStyleForTypeSelection}>
              <Text style={style.cardTextStyle}> 1-2 BR </Text>
              <Text style={style.cardTextStyle}> $69 </Text>
            </View>

            {/*---  Type 2 Card----*/}
            <View style={style.cardStyleForTypeSelection}>
              <Text style={style.cardTextStyle}> 1-2 BR </Text>
              <Text style={style.cardTextStyle}> $69 </Text>
            </View>
          </ScrollView>

        </View>
        <Text style={{ color: colors.assColor, marginBottom: 5 }}> Add $20 per additional bedroom </Text>
      </View>

      {/* ---- Frequency Type ----- */}
      <Text style={style.cardHeaderTextStyle}> Frequency </Text>
      <View style={{ alignItems: "center" }}>
        {/* ------ Row One -----*/}
        <View style={{ flexDirection: "row" }}>
          {/*--- Type 1 Card----*/}
          <TouchableOpacity onPress={function() {
            gotoCleaningScreen();
          }}>
            <View style={style.cardStyleForFrequency}>
              <Text style={style.cardTextStyle}> One Time </Text>
            </View>
          </TouchableOpacity>

          {/*---  Type 2 Card----*/}
          <View style={style.cardStyleForFrequency}>
            <Text style={style.cardTextStyle}> Weekly (-10%) </Text>
          </View>
        </View>
        {/* ------ Row One -----*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Type 1 Card----*/}
          <TouchableOpacity onPress={function() {
            gotoCleaningScreen();
          }}>
            <View style={style.cardStyleForFrequency}>
              <Text style={style.cardTextStyle}> Bi-Weekly </Text>
            </View>
          </TouchableOpacity>

          {/*---  Type 2 Card----*/}
          <View style={style.cardStyleForFrequency}>
            <Text style={style.cardTextStyle}> Monthly </Text>
          </View>
        </View>
      </View>

      {/*--- Price View -----*/}
      <View style={{ marginLeft: 25 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}> Total Price : $151.20 </Text>
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
  cardHeaderTextStyle: {
    fontSize: 18,
    marginLeft: 25,
    fontWeight: "bold",
  },
  cardTextStyle: {
    fontSize: 18,
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
  cardStyleForTypeSelection: {
    width: 168,
    height: 100,
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
  cardStyleForFrequency: {
    width: 168,
    height: 60,
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
export default CleaningScreen;

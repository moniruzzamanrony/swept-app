import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/Colors";


const CleaningScreen = () => {
  //const [titleOfType, setTitleOfType] = React.useState("");

  return (
    <View>
      {/*/!* ---- Header ------*!/*/}
      {/*<NavigationBar title="Cleaning" url="LoginScreen"/>*/}
      {/*/!* ---- Selection Part ----- *!/*/}
      {/*<Text style={{ fontSize: 18, margin: 25}}>Tell Us About Your House </Text>*/}
      {/*<View style={{ alignItems: "center"}}>*/}
      {/*  <View style={{ flexDirection: "row", marginBottom: 10 }}>*/}
      {/*    /!*--- Cleaning Card----*!/*/}
      {/*    <TouchableOpacity onPress={function() {*/}
      {/*      gotoCleaningScreen();*/}
      {/*    }}>*/}
      {/*      <View style={style.cardStyle}>*/}
      {/*        <Image*/}
      {/*          source={require("../../assets/icons/building_icon.png")}*/}
      {/*          style={{ height: 60, width: 60 }}*/}
      {/*        />*/}
      {/*        <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Apartment/*/}
      {/*          Townhome</Text>*/}
      {/*      </View>*/}
      {/*    </TouchableOpacity>*/}
      {/*    /!*--- Handyman Card----*!/*/}
      {/*    <View style={style.cardStyle}>*/}
      {/*      <Image*/}
      {/*        source={require("../../assets/icons/home_icon.png")}*/}
      {/*        style={{ height: 60, width: 60 }}*/}
      {/*      />*/}
      {/*      <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Condo/*/}
      {/*        House</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</View>*/}
      {/*/!* ---- Dynamic Body Part ----- *!/*/}
      {/*<Text style={{ fontSize: 18, margin: 25}}> Apartment/Townhome Type </Text>*/}
      {/*<View style={{ alignItems: "center"}}>*/}
      {/*  <View style={{ flexDirection: "row", marginBottom: 10 }}>*/}
      {/*    /!*--- Cleaning Card----*!/*/}
      {/*    <TouchableOpacity onPress={function() {*/}
      {/*      gotoCleaningScreen();*/}
      {/*    }}>*/}
      {/*      <View style={style.cardStyle}>*/}
      {/*        <Image*/}
      {/*          source={require("../../assets/icons/building_icon.png")}*/}
      {/*          style={{ height: 60, width: 60 }}*/}
      {/*        />*/}
      {/*        <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Apartment/*/}
      {/*          Townhome</Text>*/}
      {/*      </View>*/}
      {/*    </TouchableOpacity>*/}
      {/*    /!*--- Handyman Card----*!/*/}
      {/*    <View style={style.cardStyle}>*/}
      {/*      <Image*/}
      {/*        source={require("../../assets/icons/home_icon.png")}*/}
      {/*        style={{ height: 60, width: 60 }}*/}
      {/*      />*/}
      {/*      <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Condo/*/}
      {/*        House</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</View>*/}
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
export default CleaningScreen;

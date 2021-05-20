import React, { useEffect } from "react";
import { AsyncStorage, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";
import { colors } from "../../theme/Colors";
import axios from "axios";
import { Api } from "../../contants/Api";
import { Toast } from "native-base";

const HomeScreen = (props) => {

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    axios.get(Api.BASE_URL + Api.GET_PROFILE)
      .then(function(response) {
        console.log(response.data.user);
        //Set Data
        AsyncStorage.setItem("id", response.data.user.id.toString());
        AsyncStorage.setItem("email", response.data.user.email);
        AsyncStorage.setItem("phone", response.data.user.phone);
        AsyncStorage.setItem("address", response.data.user.address);
        AsyncStorage.setItem("avatar", response.data.user.avatar);

      })
      .catch(function(error) {
        Toast.show({
          text: "Undefine Logged User",
          buttonText: "Okay",
          type: "danger",
        });

      });
  };

  const gotoCleaningScreen = () => {


    //Navigate to Home Screen
    props.navigation.navigate("CleaningScreen");
  };


  return (
    <View style={style.body}>
      {/*---- Header ------*/}
      <View style={style.header}>
        {/*Must be use react-native grid for proper responsive*/}
        <View style={style.headerTitle}>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>Good Morning !</Text>
          <Text style={{ fontSize: 16, margin: 2 }}>How may we assist you? </Text>
        </View>
        <View style={style.headerAvatar}>
          <Image
            source={require("../../../assets/avatar/profile.png")}
            style={{ width: 50, height: 50, borderRadius: 50 / 2, alignSelf: "flex-end" }}
          />
        </View>
      </View>
      {/*---- Main Card Body ------*/}
      <View style={{ margin: 20 }}>
        {/*--- Row 1*/}

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity onPress={function() {
            gotoCleaningScreen();
          }}>
            {/*--- Cleaning Card----*/}
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/cleaning_icon.png")}
                style={{ height: 60, width: 60 }}
              />
              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Cleaning</Text>
            </View>
          </TouchableOpacity>
          {/*--- Handyman Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../../assets/icons/technician_logo.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Handyman</Text>
          </View>
        </View>

        {/*--- Row 2*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Cleaning Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../../assets/icons/pet_care_icon.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Pet Care</Text>
          </View>

          {/*--- Handyman Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../../assets/icons/concierge_icon.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Concierge</Text>
          </View>
        </View>

        {/*--- Row 3*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Cleaning Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../../assets/icons/vertual_p_a_icon.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", textAlign: "center", fontSize: 18 }}>Virtual
              Personal
              Assistant</Text>
          </View>

          {/*--- Handyman Card----*/}
          <View style={style.cardStyle}>
            <Image
              source={require("../../../assets/icons/makeup_icon.png")}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ margin: 10, fontWeight: "bold", textAlign: "center", fontSize: 18 }}>Home Spa/
              Beauty Service</Text>
          </View>
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
export default HomeScreen;

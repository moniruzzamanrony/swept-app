import React, { useEffect, useState } from "react";
import { AsyncStorage, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";
import { colors } from "../../theme/Colors";
import axios from "axios";
import { Api } from "../../contants/Api";
import { Toast } from "native-base";
import moment from "moment-timezone";
import * as RNLocalize from 'react-native-localize';

const HomeScreen = (props) => {
  // Style
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);
  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundInDarkColor,
    },
    header: {
      backgroundColor: colors.baseBackgroundInLightDarkColor,
      height: 139,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      flexDirection: "row",
    },
    headerTitle: {
      marginTop: 69,
      marginLeft: 30,
      marginBottom: 15,

    },
    headerAvatar: {
      width: widthHalf,
      marginTop: 69,
      marginBottom: 15,

    },
    cardStyle: {
      width: widthHalf - 10,
      height: widthHalf - 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.baseBackgroundInDarkColor,
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
      color: colors.black,
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
    subTitle:{
      textAlign: "center",
      margin: 10,
      fontSize: 15,
      color: colors.white
    }
  });
  const [profilePicturePath, setProfilePicturePath] = React.useState(null);
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
        setProfilePicturePath(response.data.user.avatar);
      })
      .catch(function(error) {
        Toast.show({
          text: "Undefine Logged User",
          buttonText: "Okay",
          type: "danger",
        });

      });
  };

  const gotoSelectedScreen = (screen) => {
    //Navigate to Home Screen
    props.navigation.navigate(screen);
  };

  const getDayMomentStatus = () => {

    const deviceTimeZone = RNLocalize.getTimeZone();
    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);
    const curHr = today.hour();

    if (curHr < 12) {
      console.log("good morning");
      return "Good morning";

    } else if (curHr < 15) {
      console.log("good afternoon");
      return "Good afternoon";

    } else {
      console.log("good evening");
      return "Good evening";

    }
  };

  return (
    <View style={style.body}>
      {/*---- Header ------*/}
      <View style={style.header}>
        {/*Must be use react-native grid for proper responsive*/}
        <View style={style.headerTitle}>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5, color: colors.white }}>{getDayMomentStatus()} !</Text>
          <Text style={{ fontSize: 16, margin: 2,color: colors.white }}>How may we assist you? </Text>
        </View>
        <TouchableOpacity onPress={function() {
          gotoSelectedScreen("MyProfileScreen");
        }}>
          <View style={style.headerAvatar}>
            {
              profilePicturePath === null ?
                  <Image
                      source={require("../../../assets/avatar/profile.png")}
                      style={{ width: 50, height: 50, borderRadius: 50 / 2, alignSelf: "flex-end" }}
                  /> :
                  <Image
                      source={{ uri: Api.IMAGE_VIEW_BASE_URL + "avatar/" + profilePicturePath }}
                      style={{ width: 50, height: 50, borderRadius: 50 / 2, alignSelf: "flex-end" }}
                  />
            }
          </View>
        </TouchableOpacity>

      </View>
      <View>
        <Text style={{textAlign: "center",
          marginTop: 10,
          fontSize: 22,
          color: colors.white}}>Welcome to <Text style={{color: colors.cardSelectedBorderColor,fontWeight:'bold'}}>SWEPT</Text>!</Text>
        <Text style={{textAlign: "center",
          fontSize: 20,
          marginBottom:10,
          color: colors.white}}>Please <Text style={{color: colors.marunColor}}>Choose</Text> from the options below</Text>
      </View>
      {/*---- Main Card Body ------*/}
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
          {/*--- Row 1*/}

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity onPress={function() {
              gotoSelectedScreen("CleaningScreen");
            }}>
              {/*--- Cleaning Card----*/}
              <View style={style.cardStyle}>
                <Image
                  source={require("../../../assets/icons/cleaning_icon.png")}
                  style={{ height: widthHalf/2, width: widthHalf/2 }}
                />
                <Text style={style.subTitle}>Cleaning</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={function() {
            gotoSelectedScreen("HandymanScreen");
          }}>
            {/*--- Handyman Card----*/}
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/technician_logo.png")}
                style={{ height: widthHalf/2, width: widthHalf/2 }}
              />
              <Text style={style.subTitle}>Handyman</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*--- Row 2*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Pet Care Card----*/}
          <TouchableOpacity onPress={function() {
            gotoSelectedScreen("PatCareScreen");
          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/pet_care_icon.png")}
                style={{ height: widthHalf/2, width: widthHalf/2 }}
              />
              <Text style={style.subTitle}>Pet Care</Text>
            </View>
          </TouchableOpacity>
          {/*----- concierge -----*/}
          <TouchableOpacity onPress={function() {
            gotoSelectedScreen("ConciergeScreen");
          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/concierge_icon.png")}
                style={{ height: widthHalf/2, width: widthHalf/2 }}
              />
              <Text style={style.subTitle}>Concierge</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*--- Row 3*/}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {/*--- Vertual Ass Card----*/}
          <TouchableOpacity onPress={function() {
            gotoSelectedScreen("VirtualPerAssScreen");
          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/vertual_p_a_icon.png")}
                style={{ height: widthHalf/2, width: widthHalf/2 }}
              />
              <Text style={style.subTitle}>Virtual
                Personal
                Assistant</Text>
            </View>
          </TouchableOpacity>

          {/*--- HomeSpaScreen Card----*/}
          <TouchableOpacity onPress={function() {
            gotoSelectedScreen("HomeSpaScreen");
          }}>
            <View style={style.cardStyle}>
              <Image
                source={require("../../../assets/icons/makeup_icon.png")}
                style={{ height: widthHalf/2, width: widthHalf/2 }}
              />
              <Text style={style.subTitle}>Home Spa/
                Beauty Service</Text>
            </View>
          </TouchableOpacity>
        </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

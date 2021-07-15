import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";

const AddressScreen = (props) => {
  const [address, setAddress] = React.useState("");
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) + 50);

  useEffect(() => {
    setLoggedUserAddress();
  }, []);

  const setLoggedUserAddress = async () => {
    setAddress(await LoggedUserInfo.getLoggedAddress());
  };

  function gotoNextScreen() {
    if (address != "") {
      props.route.params.body.address = address;
      console.log(props.route.params);
      props.navigation.navigate("PaymentScreen", props.route.params);
    } else {
      alert("Please write your address ");
    }

  }

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
      fontSize: 22,
      fontWeight: "bold",
    },
    cardTextStyle: {
      fontSize: 18,
    },
    cardStyle: {
      width: 168,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttonBgColor,
      borderRadius: 15,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
      margin: 10,
    },
    selectedCardStyle: {
      width: 168,
      height: 170,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
      borderRadius: 15,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
      margin: 10,
      borderWidth: 2,
      borderColor: "green",
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
    selectedCardStyleForTypeSelection: {
      width: 168,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
      borderRadius: 15,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
      margin: 10,
      borderWidth: 2,
      borderColor: "green",
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
      borderRadius: 8,
      color: colors.black,
      padding: 15,
      borderWidth: 2,
      margin: 10,
      borderColor: colors.offWhite,
    },
    getStartBut: {
      width: widthHalf,
      height: 60,
      marginTop: 30,
      backgroundColor: colors.buttonBgColor,
      color: colors.black,
      borderRadius: 9,
      justifyContent: "center",
    },
    buttomBut: {
      marginLeft: width / 4,

    },
    errorMessage: {
      fontSize: 11,
      color: colors.offRed,
      margin: 2,
    },
  });
  return (
    <View>
      {/* ---- Header ------*/}
      <NavigationBar title="Address" url="TimeAndDateScreen" navigation={props} />


      {/* ---- Address ----- */}
      <TextInput style={style.inputField}
                 multiline={true}
                 numberOfLines={6}
                 value={address}
                 onChangeText={address => setAddress(address)}

      />


      <View style={style.buttomBut}>
        <Button style={style.getStartBut} onPress={function() {
          gotoNextScreen();
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.black }}>Next</Text>
        </Button>

      </View>
    </View>

  );
};

export default AddressScreen;

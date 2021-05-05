import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import NavigationBar from "../../navigation/NavigationBar";
import { Text } from "react-native-elements";
import { colors } from "../../theme/Colors";
import axios from "axios";
import { Api } from "../../contants/Api";
import { Root } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";

const MyProfileScreen = () => {
  const [name, setName] = React.useState("");
  const [nameDisable, setNameDisable] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailDisable, setEmailDisable] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [phoneDisable, Err, setPhoneDisable] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [addressDisable, setAddressDisable] = React.useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    getProfileDetails();
    console.log("this will run the first time the component renders!");
  }, {});

  const getProfileDetails = () => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.GET_PROFILE)
      .then(function(response) {

        console.log(response.data);

        // Hide Loader
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        // Hide Loader
        setLoading(false);
      });
  };


  return (
    <Root>
      {/* Loading Screen Start*/}
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        textStyle={{ color: colors.buttonBgColor }}
      />
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Profile" url="LoginScreen" />

        <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
          <Image
            source={require("../../../assets/avatar/profile.png")}
            style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
          />
        </View>

        {/*Input Field*/}
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Name</Text>
          <TextInput style={style.inputField} onChangeText={name => setName(name)}
                     editable={nameDisable} />
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Email</Text>
          <TextInput style={style.inputField} onChangeText={phoneOrEmail => setEmail(phoneOrEmail)}
                     editable={emailDisable} />
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Phone No.</Text>
          <TextInput style={style.inputField} onChangeText={phone => setPhone(phone)}
                     editable={phoneDisable} />
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Address</Text>
          <TextInput style={style.inputField} onChangeText={address => setAddress(address)}
                     editable={addressDisable} />
        </View>
      </View>
    </Root>
  );
};
const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.baseBackgroundColor,
  },
  inputField: {
    backgroundColor: colors.white,
    width: 350,
    height: 54,
    borderRadius: 8,
    borderWidth: 2,
    padding: 10,
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
  },
  buttomBut: {
    marginLeft: 60,

  },
  formDiv: {
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 10,

  },
});
export default MyProfileScreen;

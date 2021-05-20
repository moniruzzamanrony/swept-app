import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import NavigationHeader from "../navigation/NavigationHeader";
import { Button, Root } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Api } from "../contants/Api";
import axios from "axios";

const PaymentScreen = (props) => {
  const [name, setName] = React.useState("");
  const [nameErr, setNameErr] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [phoneErr, setPhoneErr] = React.useState(false);
  const [cc, setCc] = React.useState("");
  const [ccErr, setCcErr] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [expErr, setExpErr] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [codeErr, setCodeErr] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const gotoSignUpPage = () => {
    console.log(props.route.params);
    if (name === "") {
      setNameErr(true);
    }
    if (email === "") {
      setEmailErr(true);
    }
    if (phone === "") {
      setExpErr(true);
    }
    if (cc === "") {
      setCcErr(true);
    }
    if (exp === "") {
      setExpErr(true);
    }
    if (code === "") {
      setCodeErr(true);
    } else {
      const body = props.route.params;

      // Show Loader
      setLoading(true);
      axios.post(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + Api.ORDER_CLEANING, body)
        .then(function(response) {
          console.log(response);
          //Navigate to Home Screen
          // props.navigation.navigate("LoginScreen");

          // Hide Loader
          setLoading(false);
        })
        .catch(function(error) {
          console.log(error);

          // Hide Loader
          setLoading(false);
        });
    }

  };


  return (
    <Root>
      <View style={style.body}>
        {/* Loading Screen Start*/}
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          textStyle={{ color: colors.buttonBgColor }}
        />
        {/* Loading Screen End*/}

        {/*------Header-----*/}
        <NavigationHeader title="Payment" url="LoginScreen" />

        <View style={{ flexDirection: "row", margin: 20 }}>
          <Text style={{ fontSize: 24 }}>Enter your contact and
            Payment information</Text>
        </View>
        <ScrollView>
        {/*Input Field*/}
        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Name</Text>
          <TextInput style={style.inputField} onChangeText={name => setName(name)} />
          {nameErr ? <Text style={style.errorMessage}>Name required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Email</Text>
          <TextInput style={style.inputField} onChangeText={phoneOrEmail => setEmail(phoneOrEmail)} />
          {emailErr ? <Text style={style.errorMessage}>Email required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Phone No.</Text>
          <TextInput style={style.inputField} onChangeText={phone => setPhone(phone)} />
          {phoneErr ? <Text style={style.errorMessage}>Phone No. required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>CC#</Text>
          <TextInput style={style.inputField} onChangeText={address => setCc(address)} />
          {ccErr ? <Text style={style.errorMessage}>CC# required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Exp</Text>
          <TextInput style={style.inputField} onChangeText={password => setExp(password)}
          />
          {expErr ? <Text style={style.errorMessage}>Exp required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Code</Text>
          <TextInput style={style.inputField} onChangeText={reTypePassword => setCode(reTypePassword)}
                     placeholder="3 digits" />
          {codeErr ? <Text style={style.errorMessage}>Code required !</Text> : null}
        </View>

        <View style={style.buttomBut}>
          <Button style={style.getStartBut} onPress={function() {
            gotoSignUpPage();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Book Now</Text>
          </Button>
        </View>
        </ScrollView>
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
    marginTop: 10,
    marginBottom: 10,
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
export default PaymentScreen;

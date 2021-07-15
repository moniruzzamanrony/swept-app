import React, { useState } from "react";
import { Dimensions, Linking, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Api } from "../contants/Api";
import axios from "axios";
import { MediaType } from "../contants/MediaType";
import NavigationBar from "../navigation/NavigationBar";

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
  const [api, setApi] = useState(props.route.params.api);
  const [requestType, setRequestType] = useState(props.route.params.requestType);
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) + 50);

  const gotoSignUpPage = () => {
    const body = props.route.params.body;
    console.log(props.route.params.body.total_price);
    console.log(api);
    console.log(requestType);
    if (name === "") {
      setNameErr(true);
    }
    if (email === "") {
      setEmailErr(true);
    }
    if (phone === "") {
      setPhoneErr(true);
    } else {
      const body = props.route.params.body;
      // Show Loader
      setLoading(true);
      if (requestType == MediaType.JSON) {
        axios.post(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + api, body)
          .then(function(response) {
            console.log(response.data.Message);
            loadInBrowser(response.data.Message);
            //Navigate to Home Screen
            //props.navigation.navigate("SuccessScreen");

            // Hide Loader
            setLoading(false);
          })
          .catch(function(error) {
            console.log(error);
            // TODO: Remove navigation from here
            Toast.show({
              text: "Please Try Again! ",
              buttonText: "Okay",
              type: "danger",
            });
            // Hide Loader
            setLoading(false);
          });
      }
      if (requestType == MediaType.FORM_DATA) {
        const bodyFormData = body.form_data;
        bodyFormData.append("address", body.address);
        bodyFormData.append("date", body.date);
        console.log(bodyFormData);
        setLoading(true);
        const config = {
          method: "post",
          url: Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + api,
          data: bodyFormData,
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        };

        axios(config)
          .then(function(response) {
            console.log(response);
            loadInBrowser(response.data.Message);
            //Navigate to Home Screen
            //props.navigation.navigate("SuccessScreen");
            // Hide Loader
            setLoading(false);
          })
          .catch(function(error) {
            console.log(error);
            Toast.show({
              text: "Please Try Again! ",
              buttonText: "Okay",
              type: "danger",
            });
            setLoading(false);
          });
      }
    }
  };
  const loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => Toast.show({
      text: err,
      buttonText: "Okay",
      type: "danger",
    }));
  };

  function getTotalPaymentAmount() {
    if (typeof props.route.params.body.total_price === "object") {
      console.log(props.route.params.body.total_price);
      return eval(props.route.params.body.total_price.join("+")).toFixed(2);
    } else {
      return props.route.params.body.total_price;
    }

  }

  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    inputField: {
      backgroundColor: colors.white,
      color: colors.black,
      width: width,
      height: 54,
      borderRadius: 8,
      borderWidth: 2,
      padding: 10,
      borderColor: colors.offWhite,
    },
    getStartBut: {
      width: widthHalf,
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
      marginLeft: width / 4,

    },
    formDiv: {
      marginLeft: 28,
      marginRight: 28,
      marginBottom: 10,

    },
  });
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
        <NavigationBar title="Payment" url="AddressScreen" navigation={props} />

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
            {
              requestType == MediaType.FORM_DATA ?
                null :
                <Text style={{ fontWeight: "bold", padding: 10, color: colors.assColor }}>
                  Total Price: ${getTotalPaymentAmount()}
                </Text>
            }

          </View>
          {/*<View style={style.formDiv}>*/}
          {/*  <Text style={{ margin: 2 }}>CC#</Text>*/}
          {/*  <TextInput style={style.inputField} onChangeText={address => setCc(address)} />*/}
          {/*  {ccErr ? <Text style={style.errorMessage}>CC# required !</Text> : null}*/}
          {/*</View>*/}

          {/*<View style={style.formDiv}>*/}
          {/*  <Text style={{ margin: 2 }}>Exp</Text>*/}
          {/*  <TextInput style={style.inputField} onChangeText={password => setExp(password)}*/}
          {/*  />*/}
          {/*  {expErr ? <Text style={style.errorMessage}>Exp required !</Text> : null}*/}
          {/*</View>*/}

          {/*<View style={style.formDiv}>*/}
          {/*  <Text style={{ margin: 2 }}>Code</Text>*/}
          {/*  <TextInput style={style.inputField} onChangeText={reTypePassword => setCode(reTypePassword)}*/}
          {/*             placeholder="3 digits" />*/}
          {/*  {codeErr ? <Text style={style.errorMessage}>Code required !</Text> : null}*/}
          {/*</View>*/}

          <View style={style.buttomBut}>
            <Button style={style.getStartBut} onPress={function() {
              gotoSignUpPage();
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Pay & Book Now</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </Root>
  );
};

export default PaymentScreen;

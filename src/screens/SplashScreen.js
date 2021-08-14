import React, { useEffect } from "react";
import { AsyncStorage, Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/Colors";
import { Button, Icon, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";

const SplashScreen = (props) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  useEffect(async () => {
    if (await AsyncStorage.getItem("email") != null &&
      await AsyncStorage.getItem("password") != null
    ) {
      // setEmail(await AsyncStorage.getItem("email"))
      // setPassword(await AsyncStorage.getItem("password"))

      await login();
      console.log(await AsyncStorage.getItem("email"));
      console.log(await AsyncStorage.getItem("password"));
      setIsLogged(true);
    }

  }, []);
  const login = async () => {

    const body = {
      "email": await AsyncStorage.getItem("email"),
      "password": await AsyncStorage.getItem("password"),
    };


    axios.post(Api.BASE_URL + Api.LOGIN, body)
      .then(function(response) {

        //Set Token
        AsyncStorage.setItem("token", response.data.access_token);

        //Navigate to Home Screen
        props.navigation.navigate("DashboardScreen");

      })
      .catch(function(error) {
        // Log show
        console.log(error);

        Toast.show({
          text: "Wrong password!",
          buttonText: "Okay",
          type: "danger",
        });

      });

  };
  const gotoLoginPage = () => {
    props.navigation.navigate("LoginScreen");
  };

  return (
    <View style={style.body}>
      <Image style={{ margin: 20 }} source={require("../../assets/logo/logo.png")} />
      <Text style={style.subTitle}>Get ready to make</Text>
      <Text style={style.subTitle}>your life easy</Text>
      <View>

        {
          isLogged ? <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Logging...</Text> :
            <Button style={style.getStartBut} onPress={function() {
              gotoLoginPage();
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>Get Started</Text>
              <Icon name="arrow-forward" style={{ fontSize: 20, color: colors.black }} />
            </Button>
        }
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 3,
    backgroundColor: colors.baseBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 0.04,
    fontStyle: "normal",
    color: colors.deepWhite,
    textAlign: "center",
    textTransform: "uppercase",
  },
  getStartBut: {
    width: 292,
    height: 60,
    marginTop: 50,
    backgroundColor: colors.buttonBgColor,
    color: colors.black,
    borderRadius: 9,
    justifyContent: "center",
  },
});
export default SplashScreen;

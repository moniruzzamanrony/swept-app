import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/Colors";
import Text from "react-native-paper/src/components/Typography/Text";
import NavigationBar from "../navigation/NavigationBar";
import axios from "axios";
import { Api } from "../contants/Api";
import { Button } from "native-base";

const HomeSpaScreen = (props) => {

  const [getResponse, setGetResponse] = React.useState([]);

  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = () => {
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + Api.GET_HOMESPA)
      .then(function(response) {
        setGetResponse(response.data.Result);
        //console.log(response.data.Result);
        console.log(getResponse);
      })
      .catch(function(error) {
        console.log(error);
      });

  };

  const gotoSelectedScreen = (screen) => {
    //Navigate to Home Screen
    props.navigation.navigate(screen);
  };
  return (
    <ScrollView>
      <View>
        <NavigationBar title="Beauty & Spa" url="LoginScreen" />
        <View style={style.formDiv}>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Select Your Service</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {getResponse.map((res, index) => {
            return (
              /* Show two card in one column repeatedly*/

              <TouchableOpacity onPress={function() {
                gotoSelectedScreen("ConciergeInformation");
              }}>
                <View style={style.cardStyle}>
                  <Image
                    source={{ uri: res.image }}
                    style={{ height: 60, width: 60 }}
                  />
                  <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>{res.name}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>$ {res.price}</Text>
                </View>
              </TouchableOpacity>

            );
          })}
        </View>
        <View style={style.formDiv}>
          <Text style={{ fontWeight: "bold", padding: 10, color: colors.assColor }}>
            Total Price: $30
          </Text>
        </View>
        <View style={{ paddingStart: 50, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {

          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
          </Button>
        </View>

      </View>
    </ScrollView>
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
  formDiv: {
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 10,

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
    marginTop: 10,
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
export default HomeSpaScreen;
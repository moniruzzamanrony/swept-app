import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/Colors";
import Text from "react-native-paper/src/components/Typography/Text";
import NavigationBar from "../navigation/NavigationBar";
import axios from "axios";
import { Api } from "../contants/Api";
import { Button } from "native-base";

const ConciergeScreen = (props) => {

  const [getResponse, setGetResponse] = React.useState([]);
  const [conciergeId, setConciergeId] = React.useState();
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = () => {
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + Api.GET_CONCIERGE)
      .then(function(response) {
        setGetResponse(response.data.Result);
        console.log(response.data.Result);
      })
      .catch(function(error) {
        console.log(error);
      });

  };
  // For Change Bg
  const changeBackground = (id) => {
    setCardBg(id);
  };
  const gotoSelectedScreen = (screen) => {
    //Navigate to Home Screen
    props.navigation.navigate(screen);
  };

  const submit = () => {
    if (conciergeId === 34345) {
      gotoSelectedScreen("PersonalItemScreen");
    } else {
      props.navigation.navigate("ConciergeInformation", { conciergeId: conciergeId });
    }
  };

  return (

    <ScrollView>
      <View>
        <NavigationBar title="Concierge" url="DashboardScreen" navigation={props} />
        <View style={style.formDiv}>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Tell Us About Your Place/Service</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {getResponse.map((res, index) => {
            return (
              /* Show two card in one column repeatedly*/

              <TouchableOpacity onPress={function() {
                setConciergeId(res.id);
                changeBackground(res.id);
              }}>
                <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                  <Image
                    source={{ uri: Api.IMAGE_VIEW_BASE_URL + "conciergeServiceImage/" + res.image }}
                    style={{ height: 60, width: 60 }}
                  />
                  <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>{res.concierge_name}</Text>
                </View>
              </TouchableOpacity>

            );
          })}
          <TouchableOpacity onPress={function() {
            changeBackground(34345);
            setConciergeId(34345);
          }}>
            <View style={cardBg === 34345 ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
              <Image source={require("../../assets/icons/personal_item.png")} style={{ height: 60, width: 60 }} />

              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Personal
                Item</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold", padding: 10, color: colors.assColor }}>
          Your Virtual Personal Assistant will contact you
          with your quote within 15 minutes
        </Text>
        <View style={{ paddingStart: 50, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            submit();
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
  formDiv: {
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 10,

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
  // For Change Bg
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
  selectedCardStyleForTypeSelection: {
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
});
export default ConciergeScreen;
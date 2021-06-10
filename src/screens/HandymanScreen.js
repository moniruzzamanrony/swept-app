import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Api } from "../contants/Api";
import { Button, Root, Toast } from "native-base";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import * as Validators from "../validator/Validators";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../theme/Colors";
import NavigationBar from "../navigation/NavigationBar";
import { MediaType } from "../contants/MediaType";

const HandymanScreen = (props) => {
  const [result, setResult] = React.useState([]);
  const [title, setTitle] = React.useState("Tell Us About Your Service");

  const [servicetype, setServicetype] = React.useState("handimen");
  const [servicearea, setServicearea] = React.useState("apartmenttownhome");

  const [apartmentCardStyle, setApartmentCardStyle] = React.useState(style.cardStyle);
  const [condHouseCardStyle, setCondHouseCardStyle] = React.useState(style.cardStyle);
  const [frequencyCardStyle, setFrequencyCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [roomTypeCardStyle, setRoomTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeCardStyle, setCleanTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeTitle, setCleanTypeTitle] = React.useState("Type of cleaning");

  //Selected Data
  const [houseType, setHouseType] = React.useState("");
  const [serviceName, setServiceName] = React.useState("");
  const [servicePriceId, setServicePriceId] = React.useState("");
  const [descriptions, setDescriptions] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0.0);


  // UI SETUP
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    callApi(servicetype, servicearea);
  }, []);

  const callApi = (servicetype, servicearea) => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + servicetype + "/" + servicearea)
      .then(function(response) {
        console.log(response);
        setResult(response.data.Result);
        setLoading(false);
      })
      .catch(function(error) {
        setLoading(false);
        console.warn(error);
        Toast.show({
          text: "Something Wrong ",
          buttonText: "Okay",
          type: "danger",
        });

        // Hide Loader
        // setLoading(false);
      });
  };
  const gettingResultBySelectedOption = (servicetype, servicearea) => {
    setServicearea(servicearea);
    setServicetype(servicetype);
    callApi(servicetype, servicearea);
    if (servicearea === "apartmenttownhome") {
      //Clean Variable
      setTotalAmount("");
      setDescriptions("");
      setServicePriceId("");
      setServiceName("");
      setHouseType("");

      //Set Data
      setHouseType(servicearea);
      setApartmentCardStyle(style.selectedCardStyle);
      setCondHouseCardStyle(style.cardStyle);
      setTitle("Apartment/Townhome Type");
      setCleanTypeTitle("Type of cleaning");
    } else {
      //Clean Variable
      setTotalAmount("");
      setDescriptions("");
      setServicePriceId("");
      setServiceName("");
      setHouseType("");

      //Set Data
      setHouseType(servicearea);
      setCondHouseCardStyle(style.selectedCardStyle);
      setApartmentCardStyle(style.cardStyle);
      setTitle("Room Type");
      setCleanTypeTitle("Clean Type");
    }


  };


  const gotoNextScreen = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "requestType": MediaType.JSON,
      "api": Api.ORDER_HANDIMEN,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
        "house_type": houseType,
        "service_name": serviceName,
        "service_price_id": servicePriceId,
        "descriptions": descriptions,
        "date": "null",
        "address": "null",
        "total_price": totalAmount,
      },
    };

    if (Validators.checkPropertiesForEmpty(data)) {
      console.log(data);
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      alert("Please Select Properly !");
    }
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
      <ScrollView>
        {/* ---- Header ------*/}
        <NavigationBar title="Handyman" url="LoginScreen" />
        {/* ---- Selection Part ----- */}
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 25, marginTop: 25 }}>Tell Us About Your
          House </Text>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>

            {/*--- Handyman apartmenttownhome Card----*/}
            <TouchableOpacity onPress={function() {
              gettingResultBySelectedOption("handimen", "apartmenttownhome");
            }}>
              <View style={apartmentCardStyle}>
                <Image
                  source={require("../../assets/icons/building_icon.png")}
                  style={{ height: 60, width: 60 }}
                />
                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Apartment/ Townhome</Text>
              </View>
            </TouchableOpacity>
            {/*--- Handyman condohouse Card----*/}
            <TouchableOpacity onPress={function() {
              gettingResultBySelectedOption("handimen", "condohouse");
            }}>
              <View style={condHouseCardStyle}>
                <Image
                  source={require("../../assets/icons/home_icon.png")}
                  style={{ height: 60, width: 60 }}
                />
                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Condo/
                  House</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>

          {/* ---- Tell Us About Your Place ----- */}
          <Text style={style.cardHeaderTextStyle}> {title} </Text>
          <View style={{ alignItems: "center" }}>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>

              <ScrollView horizontal={true} style={{ marginLeft: 25 }}>
                {
                  result.map((data) => {
                    return (
                      <TouchableOpacity onPress={function() {
                        setRoomTypeCardStyle(data.id);
                        setServiceName(data.handimen.service_name);
                        // setRoomId(data.id);
                        // setAmount(data.room_price);
                      }}>
                        <View
                          style={roomTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                          <Image style={{ margin: 20 }} source={require("../../assets/icons/living_room.png")} />
                          {/*<Text style={style.cardTextStyle}> {data.handimen.image} </Text>*/}
                          <Text style={style.cardTextStyle}> {data.handimen.service_name} </Text>
                        </View>
                      </TouchableOpacity>
                    );

                  })
                }
              </ScrollView>

            </View>
          </View>
        </View>

        {/* ---- Price ----- */}

        <Text style={style.cardHeaderTextStyle}> {cleanTypeTitle} </Text>

        <ScrollView horizontal={true} style={{ marginLeft: 25 }}>
          {
            result.map((data) => {
              return (
                <TouchableOpacity onPress={function() {
                  setCleanTypeCardStyle(data.id);
                  setServicePriceId(data.id);
                  setTotalAmount(data.price);
                }}>
                  <View
                    style={cleanTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                    <Text style={style.cardTextStyle}> {data.quantity} </Text>
                    <Text style={style.cardTextStyle}> ${data.price} </Text>
                  </View>
                </TouchableOpacity>
              );

            })
          }
        </ScrollView>

        {/* ---- Enter Details ----- */}
        <Text style={style.cardHeaderTextStyle}> Enter Details </Text>
        <TextInput style={style.inputField}
                   multiline={true}
                   numberOfLines={6}
                   placeholder="Enter details here (work height, TV size, etc.)"
                   onChangeText={descriptions => setDescriptions(descriptions)}

        />
        <View style={{ paddingStart: 65, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            gotoNextScreen();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
          </Button>
        </View>
      </ScrollView>
    </Root>
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
  cardHeaderTextStyle: {
    fontSize: 18,
    marginLeft: 25,
    fontWeight: "bold",
  },
  cardTextStyle: {
    fontSize: 18,
  },
  cardStyle: {
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
    padding: 5,
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
    padding: 5,
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
  inputField: {
    backgroundColor: colors.white,
    width: "85%",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 25,
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
export default HandymanScreen;

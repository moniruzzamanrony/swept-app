import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";
import { Button, Root, Toast } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import * as Validators from "../validator/Validators";

const CleaningScreen = (props) => {
  // const response = [
  //   {
  //     "id": 1,
  //     "room_no": "4",
  //     "room_price": "298",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:33.000000Z",
  //     "updated_at": "2021-04-23T15:07:33.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  //   {
  //     "id": 2,
  //     "room_no": "4",
  //     "room_price": "330",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:33.000000Z",
  //     "updated_at": "2021-04-23T15:07:33.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  //   {
  //     "id": 3,
  //     "room_no": "2",
  //     "room_price": "349",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:34.000000Z",
  //     "updated_at": "2021-04-23T15:07:34.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  //   {
  //     "id": 5,
  //     "room_no": "3",
  //     "room_price": "197",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:34.000000Z",
  //     "updated_at": "2021-04-23T15:07:34.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  //   {
  //     "id": 7,
  //     "room_no": "1",
  //     "room_price": "404",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:34.000000Z",
  //     "updated_at": "2021-04-23T15:07:34.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  //   {
  //     "id": 8,
  //     "room_no": "1",
  //     "room_price": "395",
  //     "cleaning_id": 1,
  //     "created_at": "2021-04-23T15:07:34.000000Z",
  //     "updated_at": "2021-04-23T15:07:34.000000Z",
  //     "cleaning": {
  //       "id": 1,
  //       "house_type": "apartmenttownhome",
  //       "clean_type": "test 1",
  //       "frequency": "234",
  //       "created_at": "2021-04-20T17:24:47.000000Z",
  //       "updated_at": "2021-04-20T17:24:47.000000Z",
  //     },
  //   },
  // ];
  const [result, setResult] = React.useState([]);
  const [title, setTitle] = React.useState("Apartment/Townhome Type");

  const [servicetype, setServicetype] = React.useState("cleaning");
  const [servicearea, setServicearea] = React.useState("apartmenttownhome");

  const [apartmentCardStyle, setApartmentCardStyle] = React.useState(style.cardStyle);
  const [condHouseCardStyle, setCondHouseCardStyle] = React.useState(style.cardStyle);
  const [frequencyCardStyle, setFrequencyCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [roomTypeCardStyle, setRoomTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeCardStyle, setCleanTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeTitle, setCleanTypeTitle] = React.useState("Type of cleaning");

  //Selected Data
  const [cleaningId, setCleaningId] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [cleanType, setCleanType] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0.0);
  const [amount, setAmount] = React.useState("0.0");

  // UI SETUP
  const [loading, setLoading] = useState(false);

  // Warning Message
  const [isEmptyField, setIsEmptyField] = useState(false);

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
      setAmount("");
      setTotalAmount("");
      setCleanType("");
      setFrequency("");
      setRoomId("");
      setCleaningId("");

      setApartmentCardStyle(style.selectedCardStyle);
      setCondHouseCardStyle(style.cardStyle);
      setTitle("Apartment/Townhome Type");
      setCleanTypeTitle("Type of cleaning");
    } else {
      //Clean Variable
      setAmount("");
      setTotalAmount("");
      setCleanType("");
      setFrequency("");
      setRoomId("");
      setCleaningId("");

      setCondHouseCardStyle(style.selectedCardStyle);
      setApartmentCardStyle(style.cardStyle);
      setTitle("Room Type");
      setCleanTypeTitle("Clean Type");
    }


  };


  const gotoNextScreen = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "cleaning_id": cleaningId,
      "user_id": await LoggedUserInfo.getLoggedUserId(),
      "room_id": roomId,
      "clean_type": cleanType,
      "frequency": frequency,
      "date": "date",
      "address": "ads",
      "total_price": amount,
    };

    if (Validators.checkPropertiesForEmpty(data)) {
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      setIsEmptyField(true);
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
        <NavigationBar title="Cleaning" url="LoginScreen" />
        {/* ---- Selection Part ----- */}
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 25, marginTop: 25 }}>Tell Us About Your
          House </Text>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>

            {/*--- Cleaning Card----*/}
            <TouchableOpacity onPress={function() {
              gettingResultBySelectedOption("cleaning", "apartmenttownhome");
            }}>
              <View style={apartmentCardStyle}>
                <Image
                  source={require("../../assets/icons/building_icon.png")}
                  style={{ height: 60, width: 60 }}
                />
                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 18 }}>Apartment/ Townhome</Text>
              </View>
            </TouchableOpacity>
            {/*--- Handyman Card----*/}
            <TouchableOpacity onPress={function() {
              gettingResultBySelectedOption("cleaning", "condohouse");
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

          {/* ---- Cleaning Type ----- */}
          <Text style={style.cardHeaderTextStyle}> {title} </Text>
          <View style={{ alignItems: "center" }}>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>

              <ScrollView horizontal={true} style={{ marginLeft: 25 }}>
                {
                  result.map((data) => {
                    return (
                      <TouchableOpacity onPress={function() {
                        setRoomTypeCardStyle(data.id);
                        setCleaningId(data.cleaning_id);
                        setRoomId(data.id);
                        setAmount(data.room_price);
                      }}>
                        <View
                          style={roomTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                          <Text style={style.cardTextStyle}> {data.room_no} </Text>
                          <Text style={style.cardTextStyle}> ${data.room_price} </Text>
                        </View>
                      </TouchableOpacity>
                    );

                  })
                }
              </ScrollView>

            </View>
            <Text style={{ color: colors.assColor, marginBottom: 5 }}> Add $20 per additional bedroom </Text>
          </View>
        </View>

        {/* ---- Cleaning Type ----- */}

        <Text style={style.cardHeaderTextStyle}> {cleanTypeTitle} </Text>

        <ScrollView horizontal={true} style={{ marginLeft: 25 }}>
          {
            result.map((data) => {
              return (
                <TouchableOpacity onPress={function() {
                  setCleanTypeCardStyle(data.id);
                  setCleanType(data.cleaning.clean_type);
                }}>
                  <View
                    style={cleanTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                    <Text style={style.cardTextStyle}> {data.cleaning.clean_type} </Text>
                  </View>
                </TouchableOpacity>
              );

            })
          }
        </ScrollView>

        {/* ---- Frequency Type ----- */}
        <Text style={style.cardHeaderTextStyle}> Frequency </Text>

        {/*--- Frequency----*/}
        <ScrollView horizontal={true} style={{ marginLeft: 25 }}>
          {
            result.map((data) => {
              return (
                <TouchableOpacity onPress={function() {
                  setFrequencyCardStyle(data.id);
                  setFrequency(data.cleaning.frequency);
                }}>
                  <View
                    style={frequencyCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                    <Text style={style.cardTextStyle}> {data.cleaning.frequency} </Text>
                  </View>
                </TouchableOpacity>
              );

            })
          }
        </ScrollView>

        {/*--- Price View -----*/}
        <View style={{ marginLeft: 25 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}> Total Price : ${amount} </Text>
        </View>

        {/*--- Warning Field -----*/}
        {
          isEmptyField ?
            <View>
              <Text style={{ textAlign: "center", color: "red" }}> Please Select Properly </Text>
            </View> : null
        }


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
export default CleaningScreen;

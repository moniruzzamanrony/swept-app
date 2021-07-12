import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Api } from "../contants/Api";
import { Button, Icon, Root, Toast } from "native-base";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import * as Validators from "../validator/Validators";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../theme/Colors";
import NavigationBar from "../navigation/NavigationBar";
import { MediaType } from "../contants/MediaType";

const HandymanScreen = (props) => {
  //Style
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);
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
    paymentCard: {
      marginLeft: 25,
      marginRight: 25,
      backgroundColor: colors.white,
      borderRadius: 5,
      padding: 10,
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
    cardStyle: {
      width: widthHalf - 10,
      height: widthHalf - 10,
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
      width: widthHalf - 10,
      height: widthHalf - 10,
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
      width: widthHalf - 10,
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
      width: widthHalf - 10,
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
      color: colors.black,
      width: width,
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      marginLeft: 40,
      marginRight: 25,
      marginBottom: 10,
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

  const [result, setResult] = React.useState([]);
  const [title, setTitle] = React.useState("Tell Us About Your Service");

  const [servicetype, setServicetype] = React.useState("handimen");
  const [servicearea, setServicearea] = React.useState("apartmenttownhome");

  const [apartmentCardStyle, setApartmentCardStyle] = React.useState(style.cardStyle);
  const [condHouseCardStyle, setCondHouseCardStyle] = React.useState(style.cardStyle);
  const [frequencyCardStyle, setFrequencyCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [roomTypeCardStyle, setRoomTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeCardStyle, setCleanTypeCardStyle] = React.useState(style.cardStyleForTypeSelection);
  const [cleanTypeTitle, setCleanTypeTitle] = React.useState("Price");

  //Selected Data
  const [houseType, setHouseType] = React.useState("");
  const [serviceNameList, setServiceNameList] = React.useState([]);
  const [serviceNameTemp, setServiceNameTemp] = React.useState("");
  const [servicePriceId, setServicePriceId] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState([]);
  const [offAmount, setOffAmount] = React.useState(0.0);

  const [priceListBySelection, setPriceListBySelection] = React.useState([]);


  // UI SETUP
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    callApi(servicetype, servicearea);
  }, []);

  const callApi = (servicetype, servicearea) => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + servicetype + "/" + servicearea)
      .then(function(response) {

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
    setPriceListBySelection([]);
    setServicearea(servicearea);
    setServicetype(servicetype);
    callApi(servicetype, servicearea);
    if (servicearea === "apartmenttownhome") {
      //Clean Variable
      setTotalAmount([]);
      setDescriptions("");
      setServicePriceId([]);
      setServiceNameList([]);
      setHouseType("");

      //Set Data
      setHouseType(servicearea);
      setApartmentCardStyle(style.selectedCardStyle);
      setCondHouseCardStyle(style.cardStyle);
      setTitle("Apartment/Townhome Type");
      setCleanTypeTitle("Price");
    } else {
      //Clean Variable
      setTotalAmount([]);
      setDescriptions("");
      setServicePriceId([]);
      setServiceNameList([]);
      setHouseType("");

      //Set Data
      setHouseType(servicearea);
      setCondHouseCardStyle(style.selectedCardStyle);
      setApartmentCardStyle(style.cardStyle);
      setTitle("Job Type");
      setCleanTypeTitle("Price");
    }


  };


  const gotoNextScreen = async () => {

    const data = {
      "requestType": MediaType.JSON,
      "api": Api.ORDER_HANDIMEN,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
        "house_type": houseType,
        "service_name": serviceNameList,
        "service_price_id": servicePriceId,
        "descriptions": descriptions,
        "date": "null",
        "address": "null",
        "total_price": totalAmount,
      },
    };

    if (Validators.checkPropertiesForEmpty(data)) {

      props.navigation.navigate("TimeAndDateScreen", data);
    } else {

      alert("Please Select Properly !");
    }
  };
  const searchByServiceType = (serviceId) => {
    console.log(serviceId);
    setLoading(true);
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + servicetype + "/" + servicearea + "/" + serviceId)
      .then(function(response) {
        console.log(response.data.Result[0].service_price);
        setPriceListBySelection(response.data.Result[0].service_price);
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
        <NavigationBar title="Handyman" url="DashboardScreen" navigation={props} />
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
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>

              {
                result.map((data) => {
                  return (
                    <TouchableOpacity onPress={function() {
                      setRoomTypeCardStyle(data.id);
                      setServiceNameTemp(data.service_name);
                      searchByServiceType(data.id);
                    }}>
                      <View
                        style={roomTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                        <Image
                          source={{ uri: Api.IMAGE_VIEW_BASE_URL + "HandymanServiceImage/" + data.image }}
                          style={{ height: 60, width: 60 }}
                        />
                        <Text style={style.cardTextStyle}> {data.service_name} </Text>
                      </View>
                    </TouchableOpacity>
                  );

                })
              }
            </View>
          </View>
        </View>

        {/* ---- Price ----- */}
        {
          priceListBySelection.length == 0 ? null :
            <Text style={style.cardHeaderTextStyle}> {cleanTypeTitle} </Text>
        }


        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {
            priceListBySelection.map((data) => {
              return (
                <TouchableOpacity onPress={function() {
                  setCleanTypeCardStyle(data.id);
                  setServicePriceId([...servicePriceId, data.id]);
                  setServiceNameList([...serviceNameList, serviceNameTemp]);
                  data.off === null ?
                    setTotalAmount([...totalAmount, data.price]) :
                    setTotalAmount([...totalAmount, (+data.price) - (+data.off)]);

                  setOffAmount(data.off);
                }}>
                  <View
                    style={cleanTypeCardStyle === data.id ? style.selectedCardStyleForTypeSelection : style.cardStyleForTypeSelection}>
                    <Text style={style.cardTextStyle}> {data.quantity} </Text>
                    {
                      data.off === null ? <Text style={style.cardTextStyle}> ${data.price}</Text> :
                        <Text style={style.cardTextStyle}> ${data.price} (${data.off} off)</Text>
                    }

                  </View>
                </TouchableOpacity>
              );

            })
          }
        </View>

        {/* ---- Enter Details ----- */}
        <Text style={style.cardHeaderTextStyle}> Enter Details </Text>
        <TextInput style={style.inputField}
                   multiline={true}
                   numberOfLines={6}
                   placeholder="Enter details here (work height, TV size, etc.)"
                   onChangeText={descriptions => setDescriptions(descriptions)}

        />
        {/*--- Product Card View -----*/}
        <Text style={style.cardHeaderTextStyle}> Selected Items</Text>
        {
          serviceNameList.map((res, i) => {
            return (
              <View style={style.paymentCard}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={function() {
                    setServiceNameList(serviceNameList.filter((_, i2) => i2 !== i));
                    totalAmount.splice(i, 1);
                    servicePriceId.splice(i, 1);
                  }}>
                    <Icon name="md-close-circle" style={{ color: colors.offRed, marginLeft: 5 }} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 10, marginTop: 3, fontWeight: "bold" }}>{res}</Text>
                  <Text style={{ marginLeft: 20, marginTop: 3, fontWeight: "bold" }}>${totalAmount[i]}</Text>
                </View>
              </View>
            );
          })
        }


        <View style={{ marginLeft: 25 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Total Price: ${totalAmount.length > 0 ?
            eval(totalAmount.join("+")).toFixed(2) :
            0.0}
          </Text>
        </View>
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

export default HandymanScreen;

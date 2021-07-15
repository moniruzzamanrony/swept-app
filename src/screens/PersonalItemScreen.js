import React, { useEffect, useState } from "react";
import { Button, Icon, Root, Toast, View } from "native-base";
import NavigationBar from "../navigation/NavigationBar";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/Colors";
import Text from "react-native-paper/src/components/Typography/Text";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import { MediaType } from "../contants/MediaType";
import { Api } from "../contants/Api";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { CheckBox } from "react-native-elements";

const PersonalItemScreen = (props) => {

  // Style
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);

  const style = StyleSheet.create({

    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    paymentCard: {
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
      margin: 2,
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
    formDiv: {
      marginLeft: 28,
      marginRight: 28,
      marginBottom: 10,
    },
    inputField: {
      backgroundColor: colors.white,
      color: colors.black,
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
      textAlign: "center",
    },

    // For Change Bg
    cardStyle: {
      width: widthHalf - 10,
      height: widthHalf - 10,
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
  });

  const [data, setData] = React.useState([]);
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState([]);
  const [itemId, setItemId] = React.useState([]);
  const [productNameList, setProductNameList] = React.useState([]);
  const [conciergeId, setConciergeId] = React.useState([]);
  // UI SETUP
  const [loading, setLoading] = useState(false);
  const [isChargeCard, setIsChargeCard] = React.useState(false);
  const [isPaidVendor, setIsPaidVendor] = React.useState(false);
  // For Change Bg
  const changeBackground = (id) => {
    setCardBg(id);
  };
  const [isServiceErr, setIsServiceErr] = React.useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const onSubmit = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "requestType": MediaType.JSON,
      "api": Api.ORDER_PERSONAL_ITEM,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
        "concierge_id": itemId,
        "item_id": itemId,
        "date": "date",
        "address": "ads",
        "total_price": totalAmount,
      },

    };

    if (totalAmount.length > 0) {
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      setIsServiceErr(true);
    }
  };
  const callApi = (servicetype, servicearea) => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/personalitem")
      .then(function(response) {
        console.log(response);
        setData(response.data.Result);
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
        <View>
          {/* ---- Header ------*/}
          <NavigationBar title="Personal Items" url="ConciergeScreen" navigation={props} />
          <View style={style.formDiv}>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
              Pick from the list of convenience
              items below:
            </Text>

          </View>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>

            {
              data.map((res) => {
                return (
                  <TouchableOpacity onPress={function() {
                    setIsServiceErr(false);
                    changeBackground(res.id);
                    setTotalAmount([...totalAmount, res.price]);
                    setItemId([...itemId, res.id]);
                    setConciergeId([...itemId, res.id]);
                    setProductNameList([...productNameList, res.name]);
                  }}>
                    <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                      <Image
                        source={{ uri: Api.IMAGE_VIEW_BASE_URL + "PersonalItemImage/" + res.image }}
                        style={{ height: 60, width: 60 }}
                      />
                      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 13 }}>{res.name}</Text>
                      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 13 }}>${res.price}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            }

          </View>
          {isServiceErr ? <Text style={style.errorMessage}>Select Item !</Text> : null}
          {/*--- Product Card View -----*/}
          <View style={style.formDiv}>
            <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }}> Selected Items</Text>
            {
              productNameList.map((res, i) => {
                return (
                  <View style={style.paymentCard}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={function() {

                        setProductNameList(productNameList.filter((_, i2) => i2 !== i));
                        conciergeId.splice(i, 1);
                        itemId.splice(i, 1);
                        totalAmount.splice(i, 1);
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
          </View>
          <View style={style.formDiv}>
            <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }}>
              Total Price: ${totalAmount.length > 0 ? eval(totalAmount.join("+")).toFixed(2) :
              0.0} (With Delivery Fee $3.50)
            </Text>
          </View>
          <View style={style.formDiv}>
            <TouchableOpacity onPress={function() {

            }
            }>
              <View style={style.formDivForTwoColumn}>
                <CheckBox
                  checked={isChargeCard}
                  title="Charge My Card"
                  onPress={function() {
                    isChargeCard ? setIsChargeCard(false) :
                      setIsChargeCard(true);
                  }}
                />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={function() {

            }
            }>
              <View style={style.formDivForTwoColumn}>
                <CheckBox
                  checked={isPaidVendor}
                  title="I already paid the vendor"
                  onPress={function() {
                    isPaidVendor ? setIsPaidVendor(false) :
                      setIsPaidVendor(true);
                  }}
                />

              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingStart: (widthHalf + 40) / 4, marginBottom: 10 }}>
            <Button style={style.getStartBut} onPress={function() {
              onSubmit();
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
            </Button>
          </View>

        </View>
      </ScrollView>
    </Root>
  );
};
export default PersonalItemScreen;
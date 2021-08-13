import React, { useEffect, useState } from "react";
import {Dimensions, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import Text from "react-native-paper/src/components/Typography/Text";
import { colors } from "../theme/Colors";
import {Button, Root, Toast} from "native-base";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import { MediaType } from "../contants/MediaType";
import { Api } from "../contants/Api";
import * as Validators from "../validator/Validators";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const VirtualPerAssScreen = (props) => {
  // Style
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);
  const [loading, setLoading] = useState(false);

  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    inputField: {
      backgroundColor: colors.white,
      color: colors.black,
      width: 350,
      height: 54,
      borderRadius: 8,
      borderWidth: 2,
      padding: 10,
      borderColor: colors.offWhite,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
    },
    inputFieldHalf: {
      backgroundColor: colors.white,
      color: colors.black,
      width: 160,
      marginRight: 20,
      borderRadius: 8,
      borderWidth: 2,
      padding: 10,
      borderColor: colors.offWhite,
    },
    textArea: {
      backgroundColor: colors.white,
      marginRight: 20,
      color: colors.black,
      borderRadius: 8,
      borderWidth: 2,
      padding: 10,
      borderColor: colors.offWhite,
    },
    uploadRecordBut: {
      width: 330,
      height: 60,
      textAlign: "center",
      backgroundColor: colors.black,
      color: colors.white,
      borderRadius: 9,
      justifyContent: "center",

    },
    getStartBut: {
      width: 292,
      height: 60,
      textAlign: "center",
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
    formDivForTwoColumn: {
      marginLeft: 28,
      marginRight: 28,
      marginBottom: 10,
      flexDirection: "row",

    },
    // For Change Bg
    cardStyle: {
      width: widthHalf - 10,
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

  const [getResponse, setGetResponse] = React.useState([]);
  const [details, setDetails] = React.useState("");
  const [detailsErr, setDetailsErr] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [descriptionErr, setDescriptionErr] = React.useState("");
  const [serviceType, setServiceType] = React.useState("");
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = () => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/virtualasistant")
        .then(function(response) {
          console.log(response);
          setGetResponse(response.data.Result);
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

  const gotoNextScreen = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "requestType": MediaType.JSON,
      "api": Api.POST_VERTUAL_ASS,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
        "virtual_assistant_id": 1,
        "service_type": serviceType,
        "descriptions": description,
        "date": "date",
        "address": "ads",
        "total_price": totalPrice,
      },

    };

    if (Validators.checkPropertiesForEmpty(data)) {
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      setIsEmptyField(true);
    }
  };

  // For Change Bg
  const changeBackground = (id) => {
    setCardBg(id);
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
            <NavigationBar service_name="Virtual Assistant" url="DashboardScreen" navigation={props} />
            <View style={style.formDiv}>
              <Text style={{ marginTop: 10, fontWeight: "bold" }}>Select Your Service</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 30 }}>
              {
                getResponse.map((res) => {
                  return (
                      <TouchableOpacity onPress={function() {
                        changeBackground(res.id);
                        setTotalPrice(res.price);
                        setServiceType(res.service_name);
                      }}>
                        <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                          <Image
                              source={{ uri: Api.IMAGE_VIEW_BASE_URL + "VirtualAssistentImage/" + res.image }}
                              style={{ height: widthHalf/2, width: widthHalf/2 }}
                          />
                          <Text
                              style={{ margin: 10, fontSize: 14, textAlign: "center", fontWeight: "bold" }}>{res.service_name}</Text>
                          <Text style={{ fontSize: 12, textAlign: "center",marginBottom:5 }}>${res.price}</Text>
                        </View>
                      </TouchableOpacity>
                  );
                })
              }

            </View>
            <View style={style.formDiv}>
              <Text style={{ margin: 2, fontWeight: "bold" }}>Something Else?</Text>
              <TextInput style={style.textArea}
                         multiline={true}
                         numberOfLines={6}
                         onChangeText={details => setDescription(details)} />
              {detailsErr ? <Text style={style.errorMessage}>Details required !</Text> : null}
            </View>
            <View style={style.formDiv}>
              <Text style={{ padding: 10 }}>
                Total Price: ${totalPrice}
              </Text>
              <Text style={{ textAlign: "center", padding: 10, color: colors.assColor }}>
                Your Virtual Personal Assistant will be in touch shortly.
              </Text>
            </View>

            <View style={{ paddingStart: (widthHalf + 40) / 4, marginBottom: 10 }}>
              <Button style={style.getStartBut} onPress={function() {
                if (Validators.isEmpty(serviceType)) {
                  gotoNextScreen();
                } else {
                  alert("Empty faild found.");
                }

              }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
              </Button>
            </View>
          </View>

        </ScrollView>
      </Root>

  );
};

export default VirtualPerAssScreen;

import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import Text from "react-native-paper/src/components/Typography/Text";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import { MediaType } from "../contants/MediaType";
import { Api } from "../contants/Api";
import * as Validators from "../validator/Validators";

const VirtualPerAssScreen = (props) => {
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
    setGetResponse([
      {
        id: 1,
        title: "Help Filing Taxes",
        price: "90",
      },
      {
        id: 2,
        title: "Essay",
        price: "90",
      }, {
        id: 3,
        title: "Vacation Planning/\n" +
          "Research",
        price: "90",
      }, {
        id: 4,
        title: "Create a PowerPoint\n" +
          "Presentation\n",
        price: "90",
      }, {
        id: 5,
        title: "Internet research",
        price: "90",
      }, {
        id: 6,
        title: "Interior Design\n" +
          "Selections\n",
        price: "90",
      }, {
        id: 7,
        title: "Online shopping",
        price: "90",
      }, {
        id: 8,
        title: "Virtual Stylist",
        price: "90",
      },
      {
        id: 9,
        title: "Build a website",
        price: "90",
      }, {
        id: 10,
        title: "Sourcing Vendors",
        price: "90",
      },
      {
        id: 11,
        title: "Make a Logo",
        price: "90",
      },
      {
        id: 12,
        title: "Resume Editor",
        price: "90",
      }, {
        id: 13,
        title: "Schedule Mobile\n" +
          "Beauty/Spa Service",
        price: "90",
      },
    ]);
    console.log(getResponse);
  };

  const gotoNextScreen = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "requestType": MediaType.JSON,
      "api": Api.POST_VERTUAL_ASS,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
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
    <ScrollView>
      <View>
        <NavigationBar title="Virtual Assistant" url="LoginScreen" />
        <View style={style.formDiv}>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Select Your Service</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {
            getResponse.map((res) => {
              return (
                <TouchableOpacity onPress={function() {
                  changeBackground(res.id);
                  setTotalPrice(res.price);
                  setServiceType(res.title);
                }}>
                  <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                    <Text style={{ margin: 10, fontSize: 12, textAlign: "center" }}>{res.title}</Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>${res.price}</Text>
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
            You will Virtual Personal Assistant will send your
            quote based on the description
          </Text>
        </View>

        <View style={{ paddingStart: 50, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            gotoNextScreen();
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
  inputField: {
    backgroundColor: colors.white,
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
    width: 150,
    height: 120,
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
    width: 150,
    height: 120,
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
export default VirtualPerAssScreen;
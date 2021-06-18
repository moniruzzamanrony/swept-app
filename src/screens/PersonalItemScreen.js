import React from "react";
import { Button, View } from "native-base";
import NavigationBar from "../navigation/NavigationBar";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/Colors";
import Text from "react-native-paper/src/components/Typography/Text";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import { MediaType } from "../contants/MediaType";
import { Api } from "../contants/Api";
import * as Validators from "../validator/Validators";

const PersonalItemScreen = (props) => {
  const [data, setData] = React.useState([
    {
      id: 1,
      image: "app.jpg",
      title: "Toothbrush",
      price: 2.99,
    },
    {
      id: 2,
      image: "app.jpg",
      title: "Toothpaste",
      price: 2.99,
    }, {
      id: 3,
      image: "app.jpg",
      title: "Bottled Water",
      price: 2.99,
    }, {
      id: 4,
      image: "app.jpg",
      title: "Mask",
      price: 2.99,
    },
  ]);
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState();
  const [itemId, setItemId] = React.useState();

  // For Change Bg
  const changeBackground = (id) => {
    setCardBg(id);
  };

  const onSubmit = async () => {
    console.log(await LoggedUserInfo.getLoggedUserId());
    const data = {
      "requestType": MediaType.JSON,
      "api": Api.ORDER_PERSONAL_ITEM,
      "body": {
        "user_id": await LoggedUserInfo.getLoggedUserId(),
        "concierge_id": 1,
        "item_id": itemId,
        "date": "date",
        "address": "ads",
        "total_price": totalAmount,
      },

    };

    if (Validators.checkPropertiesForEmpty(data)) {
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      alert("Empty Field Found");
    }
  };

  return (
    <ScrollView>
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Personal Items" url="Personal Items" />
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
                  changeBackground(res.id);
                  setTotalAmount(res.price + 3.50);
                  setItemId(res.id);
                }}>
                  <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                    <Image
                      source={require("../../assets/icons/toothbrush.jpg")}
                      style={{ height: 60, width: 60 }}
                    />
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{res.title}</Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>${res.price}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }

        </View>
        <View style={style.formDiv}>
          <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }}>
            Total Price: ${totalAmount} (With Delivery Fee $3.50)
          </Text>
        </View>
        <View style={{ paddingStart: 50, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            onSubmit();
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
export default PersonalItemScreen;
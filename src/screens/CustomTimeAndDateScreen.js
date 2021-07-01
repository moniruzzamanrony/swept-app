import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import DatePicker from "react-native-date-picker";

const CustomTimeAndDateScreen = (props) => {
  const [getResponse, setGetResponse] = React.useState([]);
  const [selectedItemsIdFromList, setSelectedItemsIdFromList] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = () => {
    setGetResponse([
      {
        id: 1,
        time: "08:00 AM",
        description: "",
      },
      {
        id: 2,
        time: "08:00 AM",
        description: " ",
      }, {
        id: 3,
        time: "09:45 AM",
        description: "",
      }, {
        id: 4,
        time: "10:30 AM",
        description: "",
      }, {
        id: 5,
        time: "11:15 AM",
        description: "",
      }, {
        id: 6,
        time: "12:45 PM",
        description: "",
      }, {
        id: 7,
        time: "01:30 PM",
        description: "",
      }, {
        id: 8,
        time: "02:15 PM",
        description: "",
      }, {
        id: 9,
        time: "03:45 PM",
        description: "",
      }, {
        id: 10,
        time: "04:30 PM",
        description: "",
      }, {
        id: 11,
        time: "05:00 PM",
        description: "",
      },
    ]);
  };

  const onSelectedBorderColorChange = (data) => {
    setSelectedItemsIdFromList(data.id);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  function gotoNextScreen() {
    if (selectedDate != "") {
      props.route.params.body.date = selectedDate;
      console.log(props.route.params);
      props.navigation.navigate("AddressScreen", props.route.params);
    } else {
      alert("Please Select Properly! ");
    }
  }

  // For Change Bg
  const changeBackground = (id) => {
    setCardBg(id);
  };

  return (
    <ScrollView>
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Custom Date & Time" url="TimeAndDateScreen" navigation={props} />
        <View style={{
          justifyContent: "center",
          alignItems: "center", margin: 10,
        }}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
          />
        </View>


        {/* ---- Date Time Picker Title ----- */}
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Text style={style.cardHeaderTextStyle}> Free Slots</Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {
            getResponse.map((res) => {
              return (
                <TouchableOpacity onPress={function() {
                  changeBackground(res.id);
                  setSelectedDate(date.toISOString().split("T")[0] + " " + res.time);

                }}>
                  <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>{res.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }

        </View>

        <View>
          <View style={{ paddingStart: 65, margin: 10 }}>
            <Button style={style.getStartBut} onPress={function() {
              gotoNextScreen();
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
            </Button>
          </View>
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
  cardHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  cardTextStyle: {
    fontSize: 18,
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
  createCustomDateBut: {
    width: 292,
    height: 60,
    marginTop: 30,
    backgroundColor: colors.black,
    color: colors.white,
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
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 5,
    borderColor: colors.cardNonSelectedBorderColor,
  },
  selectedCardStyleForTypeSelection: {
    width: 168,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 5,
    borderWidth: 2,
    borderColor: "green",
  },
});
export default CustomTimeAndDateScreen;

import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";
import { Button, Icon } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimeAndDateScreen = (props) => {
  const [getResponse, setGetResponse] = React.useState([]);
  const [selectedItemsIdFromList, setSelectedItemsIdFromList] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();

  useEffect(() => {
    callGetApi();
  }, []);
  const callGetApi = () => {
    setGetResponse([
      {
        id: 1,
        time: "Today",
        description: "(BY 5PM) + $20",
      },
      {
        id: 2,
        time: "Tomorrow",
        description: " (Before 5PM)",
      }, {
        id: 3,
        time: "Within the Next Weak",
        description: "",
      },
    ]);
    console.log(getResponse);
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

    <View style={{ flexDirection: "column" }}>
      {/* ---- Header ------*/}
      <NavigationBar title="Date & Time" url="date" />


      {/* ---- Date Time Picker Title ----- */}
      <View style={{ flexDirection: "row", margin: 20 }}>
        <Icon name="time" style={{ fontSize: 25, color: colors.buttonBgColor }} />
        <Text style={style.cardHeaderTextStyle}> Pick Your Date & Time</Text>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
        {
          getResponse.map((res) => {
            return (
              <TouchableOpacity onPress={function() {
                changeBackground(res.id);
                setSelectedDate(res.time);

              }}>
                <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                  <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>{res.time}</Text>
                  <Text style={{ color: colors.assColor }}>{res.description}</Text>
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
          <Button style={style.createCustomDateBut} onPress={function() {
            showDatePicker();
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}>Create Custom Date</Text>
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
    </View>

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
    height: 80,
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
});
export default TimeAndDateScreen;

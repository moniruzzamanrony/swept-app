import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { colors } from "../theme/Colors";
import { Button, Icon } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimeAndDateScreen = (props) => {
  const [selectedItemsIdFromList, setSelectedItemsIdFromList] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

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

  const onSelectorListener = (selectedItem) => {

  };

  return (

    <View>
      {/* ---- Header ------*/}
      <NavigationBar title="Date & Time" url="date" />


      {/* ---- Date Time Picker Title ----- */}
      <View style={{ flexDirection: "row", margin: 20 }}>
        <Icon name="time" style={{ fontSize: 25, color: colors.buttonBgColor }} />
        <Text style={style.cardHeaderTextStyle}> Pick Your Date & Time</Text>
      </View>


      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={function() {
          // onSelectedBorderColorChange(data);
          setSelectedDate("Today");
        }}>
          <View style={style.cardStyle}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}> Today</Text>
            <Text style={{ color: colors.assColor }}> (BY 5PM) + $20</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={function() {
          // onSelectedBorderColorChange(data);
          setSelectedDate("Tomorrow");
        }}>
          <View style={style.cardStyle}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}> Tomorrow</Text>
            <Text style={{ color: colors.assColor }}> (Before 5PM)</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={function() {
          // onSelectedBorderColorChange(data);
          setSelectedDate("Within the Next Weak");


        }}>
          <View style={style.cardStyle}>
            <Text style={{ fontSize: 20 }}> Within the</Text>
            <Text style={{ fontSize: 20 }}> Next Weak</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
    fontWeight: "bold",
  },
  cardTextStyle: {
    fontSize: 18,
  },
  cardStyle: {
    width: 168,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.buttonBgColor,
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
});
export default TimeAndDateScreen;

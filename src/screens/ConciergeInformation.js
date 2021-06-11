import React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/Colors";
import NavigationBar from "../navigation/NavigationBar";
import { CheckBox, Text } from "react-native-elements";
import { Button } from "native-base";

const ConciergeInformation = (props) => {
  const [fName, setFName] = React.useState("");
  const [FNameErr, setFNameErr] = React.useState(false);

  const [lastName, setLastName] = React.useState("");
  const [lastNameErr, setLastNameErr] = React.useState(false);

  const [pickUpLocation, setPickUpLocation] = React.useState("");
  const [pickUpLocationErr, setPickUpLocationErr] = React.useState(false);


  const [pickUpAddress, setPickUpAddress] = React.useState("");
  const [pickUpAddressErr, setPickUpAddressErr] = React.useState("");

  const [pickUpOffDateDate, setPickUpOffDateDate] = React.useState("");
  const [pickUpOffDateDateErr, setPickUpOffDateDateErr] = React.useState("");

  const [dropOffAddress, setDropOffAddress] = React.useState("");
  const [dropOffAddressErr, setDropOffAddressErr] = React.useState("");

  const [dropOffDate, setDropOffDateDate] = React.useState("");
  const [dropOffDateErr, setDropOffDateErr] = React.useState("");

  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [specialInstructionsErr, setSpecialInstructionsErr] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [priceErr, setPriceErr] = React.useState("");

  return (
    <ScrollView>
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Information" url="LoginScreen" />
        <View style={style.formDivForTwoColumn}>
          <View>
            <Text style={{ margin: 2 }}>First name</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={fName => setFName(fName)} />
            {FNameErr ? <Text style={style.errorMessage}>First name required !</Text> : null}
          </View>

          <View>
            <Text style={{ margin: 2 }}>Last name</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={lastName => setLastName(lastName)} />
            {lastNameErr ? <Text style={style.errorMessage}>Last name required !</Text> : null}
          </View>
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Name of Pick-Up Location</Text>
          <TextInput style={style.inputField} onChangeText={pickUpLocation => setPickUpLocation(pickUpLocation)} />
          {pickUpLocationErr ? <Text style={style.errorMessage}>Name of Pick-Up Location required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Pick Up Address</Text>
          <TextInput style={style.inputField} onChangeText={pickUpAddress => setPickUpAddress(pickUpAddress)} />
          {pickUpAddressErr ? <Text style={style.errorMessage}>Pick Up Address required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Pick Up Date/Time</Text>
          <TextInput style={style.inputField}
                     onChangeText={pickUpOffDateDate => setPickUpOffDateDate(pickUpOffDateDate)} />
          {pickUpOffDateDateErr ? <Text style={style.errorMessage}>Pick Up Date/Time required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Drop Off Address</Text>
          <TextInput style={style.inputField} onChangeText={dropOffAddress => setDropOffAddress(dropOffAddress)} />
          {dropOffAddressErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Drop Off Date/Time</Text>
          <TextInput style={style.inputField} onChangeText={dropOffDate => setDropOffDateDate(dropOffDate)} />
          {dropOffDateErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Special Instructions</Text>
          <TextInput style={style.inputField}
                     onChangeText={specialInstructions => setSpecialInstructions(specialInstructions)} />
          {specialInstructionsErr ? <Text style={style.errorMessage}>Special Instructions required !</Text> : null}

        </View>

        <Text style={{ marginLeft: 35, fontWeight: "bold" }}>Payment Method</Text>
        <View style={style.formDivForTwoColumn}>
          <CheckBox
            value={false}
          />
          <Text style={{ marginTop: 15, color: colors.assColor }}>Charge My Card</Text>
        </View>
        <View style={style.formDivForTwoColumn}>
          <CheckBox
            value={false}
          />
          <Text style={{ marginTop: 15, color: colors.assColor }}>I already paid the vendor</Text>
        </View>

        {/*--- Warning Field -----*/}


        <View style={{ paddingStart: 50, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {

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
  cardStyle: {
    width: 150,
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
    flexDirection: "row",

  },
});
export default ConciergeInformation;
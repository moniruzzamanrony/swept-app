import React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { CheckBox, Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import { Button } from "native-base";

const PatCareScreen = () => {
  const [petName, setPetName] = React.useState("");
  const [petNameErr, setPetNameErr] = React.useState(false);

  const [lastName, setLastName] = React.useState("");
  const [lastNameErr, setLastNameErr] = React.useState(false);

  const [breed, setBreed] = React.useState("");
  const [breedErr, setBreedErr] = React.useState(false);

  const [weight, setWeight] = React.useState("");
  const [weightErr, setWeightErr] = React.useState("");

  const [age, setAge] = React.useState("");
  const [ageErr, setAgeErr] = React.useState("");

  const [vaccinationDate, setVaccinationDate] = React.useState("");
  const [vaccinationDateErr, setVaccinationDateErr] = React.useState("");

  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [specialInstructionsErr, setSpecialInstructionsErr] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [priceErr, setPriceErr] = React.useState("");

  const [fileUri, setFileUri] = React.useState("");
  const [fileUriErr, setFileUriErr] = React.useState("");

  const [details, setDetails] = React.useState("");
  const [detailsErr, setDetailsErr] = React.useState("");


  return (
    <ScrollView>
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Pet Care" url="LoginScreen" />
        <View style={style.formDiv}>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Tell Us About Your Pet</Text>
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Pet’s Name</Text>
          <TextInput style={style.inputField} onChangeText={name => setPetName(name)} />
          {petNameErr ? <Text style={style.errorMessage}>Pet Name required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Last Name</Text>
          <TextInput style={style.inputField} onChangeText={phoneOrEmail => setLastName(phoneOrEmail)} />
          {lastNameErr ? <Text style={style.errorMessage}>Last Name required !</Text> : null}
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2 }}>Breed/Type</Text>
          <TextInput style={style.inputField} onChangeText={phone => setBreed(phone)} />
          {breedErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}
        </View>
        <View style={style.formDivForTwoColumn}>
          <View>
            <Text style={{ margin: 2 }}>Weight</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={phoneOrEmail => setLastName(phoneOrEmail)} />
            {lastNameErr ? <Text style={style.errorMessage}>Last Name required !</Text> : null}
          </View>

          <View>
            <Text style={{ margin: 2 }}>Age</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={phoneOrEmail => setLastName(phoneOrEmail)} />
            {lastNameErr ? <Text style={style.errorMessage}>Last Name required !</Text> : null}
          </View>
        </View>

        <View style={style.formDivForTwoColumn}>
          <View>
            <TextInput style={style.inputFieldHalf}
                       multiline={true}
                       placeholder="Vaccination Date(Boarding & Grooming)"
                       numberOfLines={4}
                       onChangeText={phone => setBreed(phone)} />
            {breedErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}
          </View>

          <View>
            <TextInput style={style.inputFieldHalf}
                       multiline={true}
                       placeholder="Special Instructions"
                       numberOfLines={4}
                       onChangeText={phone => setBreed(phone)} />
            {breedErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}
          </View>
        </View>

        {/* -----Card-----------*/}
        <View>
          <View style={style.formDivForTwoColumn}>
            <View style={style.cardStyle}>
              <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>Dog Walk/Pet Visit
                (30 Min) - $25</Text>
            </View>
            <View style={style.cardStyle}>
              <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>Basic Bath
                $45</Text>
            </View>
          </View>
        </View>

        <View style={style.formDiv}>
          <Button style={style.uploadRecordBut}>
            <Text style={{ fontSize: 14, color: colors.white, marginLeft: 20 }}>Click Here to Upload Records (jpg or
              pdf)</Text>
          </Button>
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2, fontWeight: "bold" }}>Enter details</Text>
          <TextInput style={style.textArea}
                     multiline={true}
                     numberOfLines={6}
                     onChangeText={phoneOrEmail => setLastName(phoneOrEmail)} />
          {lastNameErr ? <Text style={style.errorMessage}>Last Name required !</Text> : null}
        </View>

        <View style={style.formDivForTwoColumn}>
          <CheckBox
            value={false}
            style={style.checkbox}
          />
          <Text style={{ marginTop: 15, color: colors.assColor }}>I’m a SWEPT Pet Member</Text>
        </View>
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
    marginBottom: 10,
    flexDirection: "row",

  },
});
export default PatCareScreen;
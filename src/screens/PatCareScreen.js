import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { CheckBox, Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import * as Validators from "../validator/Validators";
import { launchImageLibrary } from "react-native-image-picker";
import { MediaType } from "../contants/MediaType";

const PatCareScreen = (props) => {
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

  const [serviceType, setServiceType] = React.useState("");
  const [serviceTypeErr, setServiceTypeErr] = React.useState("");

  const [fileUri, setFileUri] = React.useState("Click Here to Upload Records (jpg or\n" +
    "              pdf)");
  const [fileUriErr, setFileUriErr] = React.useState(true);

  const [details, setDetails] = React.useState("");
  const [detailsErr, setDetailsErr] = React.useState("");
  const [optionList, setOptionList] = React.useState([]);
  const [isEmptyField, setIsEmptyField] = useState(false);


  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = () => {

    axios.get(Api.BASE_URL + Api.SERVICE_ENDPOINT + "/" + Api.GET_PER_CARE)
      .then(function(response) {
        setOptionList(response.data.Result);
        console.log(response.data);

      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(optionList);
  };

  const uploadImage = () => {
    launchImageLibrary(options, response => {
      setFileUri(response.uri);
      setFileUriErr(true);
    });
  };

  async function gotoNextStep(): void {
    const bodyFormData = new FormData();
    bodyFormData.append("total_price", price);
    bodyFormData.append("user_id", await LoggedUserInfo.getLoggedUserId());
    bodyFormData.append("descriptions", details);
    bodyFormData.append("image", { uri: fileUri, name: "image.jpg", type: "image/jpeg" });
    bodyFormData.append("service_type", serviceType);
    bodyFormData.append("age", age);
    bodyFormData.append("weight", weight);
    bodyFormData.append("breed", breed);
    bodyFormData.append("last_name", lastName);
    bodyFormData.append("pet_name", petName);
    bodyFormData.append("petcare_id", "1");

    const data = {
      "requestType": MediaType.FORM_DATA,
      "api": Api.ORDER_PETCARE,
      "body": {
        "form_data": bodyFormData,
        "date": "date",
        "address": "ads",
      },
    };

    console.log(data);

    if (Validators.checkPropertiesForEmpty(data)) {
      props.navigation.navigate("TimeAndDateScreen", data);
    } else {
      setIsEmptyField(true);
    }
  }

  /* Image Picker */
  const options = {
    title: "Pick Your Profile Picture",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };
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
            <TextInput style={style.inputFieldHalf} onChangeText={weight => setWeight(weight)} />
            {weightErr ? <Text style={style.errorMessage}>Weight required !</Text> : null}
          </View>

          <View>
            <Text style={{ margin: 2 }}>Age</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={age => setAge(age)} />
            {ageErr ? <Text style={style.errorMessage}>Age required !</Text> : null}
          </View>
        </View>

        <View style={style.formDivForTwoColumn}>
          <View>
            <TextInput style={style.inputFieldHalf}
                       multiline={true}
                       placeholder="Vaccination Date(Boarding & Grooming)"
                       numberOfLines={4}
                       onChangeText={vaccinationDate => setVaccinationDate(vaccinationDate)} />
            {vaccinationDateErr ? <Text style={style.errorMessage}>Vaccination required !</Text> : null}
          </View>

          <View>
            <TextInput style={style.inputFieldHalf}
                       multiline={true}
                       placeholder="Special Instructions"
                       numberOfLines={4}
                       onChangeText={specialInstructions => setSpecialInstructions(specialInstructions)} />
            {specialInstructionsErr ? <Text style={style.errorMessage}>Instructions required !</Text> : null}
          </View>
        </View>

        {/* -----Card-----------*/}
        <View style={style.formDiv}>
          <Text style={{ margin: 2, fontWeight: "bold" }}>Choose One</Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <ScrollView horizontal={true}>
              {
                optionList.map((data) => {
                  return (
                    <TouchableOpacity onPress={function() {
                      setPrice(data.price);
                      setServiceType(data.name);
                    }}>
                      <View style={style.cardStyle}>
                        <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{data.name} -
                          ${data.price} </Text>
                      </View>
                    </TouchableOpacity>
                  );

                })
              }
            </ScrollView>
          </View>
        </View>

        <View style={style.formDiv}>
          <Button style={style.uploadRecordBut} onPress={function() {
            uploadImage();
          }}>
            <Text style={{ textAlign: "center", fontSize: 14, color: colors.white, marginLeft: 20 }}>
              {fileUri.slice(fileUri.length - 120)}
            </Text>
          </Button>
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2, fontWeight: "bold" }}>Enter details</Text>
          <TextInput style={style.textArea}
                     multiline={true}
                     numberOfLines={6}
                     onChangeText={details => setDetails(details)} />
          {detailsErr ? <Text style={style.errorMessage}>Details required !</Text> : null}
        </View>

        <View style={style.formDivForTwoColumn}>
          <CheckBox
            value={false}
          />
          <Text style={{ marginTop: 15, color: colors.assColor }}>I’m a SWEPT Pet Member</Text>
        </View>
        {/*--- Warning Field -----*/}
        {
          isEmptyField ?
            <View>
              <Text style={{ textAlign: "center", color: "red" }}> Please Select Properly </Text>
            </View> : null
        }
        <View style={{ paddingStart: 50, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            gotoNextStep();
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
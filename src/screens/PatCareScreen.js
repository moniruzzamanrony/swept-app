import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import { CheckBox, Text } from "react-native-elements";
import { colors } from "../theme/Colors";
import { Button } from "native-base";
import axios from "axios";
import { Api } from "../contants/Api";
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

  const [fileUri, setFileUri] = React.useState();
  const [fileUriErr, setFileUriErr] = React.useState(true);

  const [details, setDetails] = React.useState("");
  const [detailsErr, setDetailsErr] = React.useState("");

  const [optionList, setOptionList] = React.useState([]);
  const [isEmptyField, setIsEmptyField] = useState(false);

  const [isChecked, setIsChecked] = React.useState(false);
  // For Change Bg
  const [cardBg, setCardBg] = React.useState();
  const [choseOneCardBg, setChoseOneCardBg] = React.useState();
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);

  const [instructionList, setInstructionList] = React.useState([
    {
      id: 1,
      title: "Vaccination Date(Boarding & Grooming)",
    },
    {
      id: 2,
      title: "Special Instructions",
    },
  ]);


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
    bodyFormData.append("descriptions", details);
    fileUri === undefined ? null :
      bodyFormData.append("image", { uri: fileUri, name: "image.jpg", type: "image/jpeg" });
    bodyFormData.append("service_type", serviceType);
    bodyFormData.append("age", age);
    bodyFormData.append("weight", weight);
    bodyFormData.append("breed", breed);
    bodyFormData.append("last_name", lastName);
    bodyFormData.append("pet_name", petName);
    bodyFormData.append("petcare_id", "2");

    const data = {
      "requestType": MediaType.FORM_DATA,
      "total_price": price,
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

  // For Change Bg
  const changeBackgroundInstruction = (id) => {
    setCardBg(id);
  };

  const changeBackgroundChoseOne = (id) => {
    setChoseOneCardBg(id);
  };

  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    inputField: {
      backgroundColor: colors.white,
      color: colors.black,
      width: width,
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
      width: widthHalf,
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
      width: width,
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
      height: widthHalf - 10,
      fontWeight: "bold",
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
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttonBgColor,
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
  });
  return (
    <ScrollView>
      <View>
        {/* ---- Header ------*/}
        <NavigationBar title="Pet Care" url="DashboardScreen" navigation={props} />
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
            <Text style={{ margin: 2 }}>Weight (lbs)</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={weight => setWeight(weight)} />
            {weightErr ? <Text style={style.errorMessage}>Weight required !</Text> : null}
          </View>

          <View>
            <Text style={{ margin: 2 }}>Age</Text>
            <TextInput style={style.inputFieldHalf} onChangeText={age => setAge(age)} />
            {ageErr ? <Text style={style.errorMessage}>Age required !</Text> : null}
          </View>
        </View>
        {/*------------ Instruction List -----------*/}
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {
            instructionList.map((res) => {
              return (
                <TouchableOpacity onPress={function() {
                  changeBackgroundInstruction(res.id);
                  setVaccinationDate(res.title);

                }}>
                  <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                    <Text style={{ margin: 10, fontSize: 12, textAlign: "center" }}>{res.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }

        </View>

        {/* -----Card-----------*/}
        <View style={style.formDiv}>
          <Text style={{ margin: 2, fontWeight: "bold" }}>Choose One</Text>
          {
            optionList.length === 0 ? <Text style={{ color: colors.offRed }}>Service Not Found</Text> :
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                {
                  optionList.map((res) => {
                    return (
                      <TouchableOpacity onPress={function() {
                        changeBackgroundChoseOne(res.id);
                        setPrice(res.price);
                        setServiceType(res.name);
                      }}>
                        <View
                          style={choseOneCardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                          <Text style={{ margin: 10, fontSize: 12, textAlign: "center" }}>{res.name} -
                            ${res.price}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                }

              </View>
          }


        </View>

        <View style={style.formDiv}>
          <Button style={style.uploadRecordBut} onPress={function() {
            uploadImage();
          }}>
            {
              fileUri === undefined ?
                <Text style={{ textAlign: "center", fontSize: 14, color: colors.white }}>
                  Click Here to Upload Pictures & Vaccine Records
                </Text>
                :
                <Text style={{ textAlign: "center", fontSize: 14, color: colors.white }}>
                  {
                    fileUri.slice(fileUri.length - 120)}
                </Text>
            }

          </Button>
        </View>

        <View style={style.formDiv}>
          <Text style={{ margin: 2, fontWeight: "bold" }}>Special Instructions</Text>
          <TextInput style={style.textArea}
                     multiline={true}
                     numberOfLines={6}
                     onChangeText={details => setDetails(details)} />
          {detailsErr ? <Text style={style.errorMessage}>Details required !</Text> : null}
        </View>

        <View style={style.formDivForTwoColumn}>
          <CheckBox
            checked={isChecked}
            title="I’m a SWEPT VIP Member"
            onPress={function() {
              isChecked ? setIsChecked(false) :
                setIsChecked(true);
            }}
          />

        </View>
        {/*--- Warning Field -----*/}
        {
          isEmptyField ?
            <View>
              <Text style={{ textAlign: "center", color: "red" }}> Please Select Properly </Text>
            </View> : null
        }
        <View style={{ paddingStart: (widthHalf + 40) / 4, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
          <Button style={style.getStartBut} onPress={function() {
            if (Validators.isEmpty(age)) {
              gotoNextStep();
            } else {
              alert("Empty faild found.");
            }

          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Next</Text>
          </Button>
        </View>


      </View>
    </ScrollView>
  );
};
// Mandatory Field *
// <Text style={{color: colors.offRed}}> *</Text>

export default PatCareScreen;

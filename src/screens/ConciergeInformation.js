import React, {useState} from "react";
import {Dimensions, Linking, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../theme/Colors";
import NavigationBar from "../navigation/NavigationBar";
import {CheckBox, Text} from "react-native-elements";
import {Button, Root, Toast} from "native-base";
import axios from "axios";
import {Api} from "../contants/Api";
import Spinner from "react-native-loading-spinner-overlay";
import * as LoggedUserInfo from "../utils/LoggedUserInfo";
import DatePicker from "react-native-date-picker";
import * as Validators from "../validator/Validators";

const ConciergeInformation = (props) => {
  // Style
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) - 40);
  const style = StyleSheet.create({
    body: {
      flex: 3,
      backgroundColor: colors.baseBackgroundColor,
    },
    inputField: {
      backgroundColor: colors.white,
      width: width,
      color: colors.black,
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
      width: widthHalf - 10,
      height: widthHalf - 10,
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
      width: widthHalf,
      color: colors.black,
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
      flexDirection: "row",

    },
  });
  const [conciergeId, setConciergeId] = React.useState(props.route.params.conciergeId);

  const [fName, setFName] = React.useState("");
  const [FNameErr, setFNameErr] = React.useState(false);

  const [lastName, setLastName] = React.useState("");
  const [lastNameErr, setLastNameErr] = React.useState(false);

  const [pickUpLocation, setPickUpLocation] = React.useState("");
  const [pickUpLocationErr, setPickUpLocationErr] = React.useState(false);


  const [pickUpAddress, setPickUpAddress] = React.useState("");
  const [pickUpAddressErr, setPickUpAddressErr] = React.useState("");

  const [pickUpOffDateDate, setPickUpOffDateDate] = React.useState(new Date());
  const [pickUpOffDateDateErr, setPickUpOffDateDateErr] = React.useState(false);

  const [dropOffAddress, setDropOffAddress] = React.useState("");
  const [dropOffAddressErr, setDropOffAddressErr] = React.useState(false);

  const [dropOffDate, setDropOffDateDate] = React.useState(new Date());
  const [dropOffDateErr, setDropOffDateErr] = React.useState(false);

  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [specialInstructionsErr, setSpecialInstructionsErr] = React.useState(false);

  const [paymentOption, setPaymentOption] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [priceErr, setPriceErr] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const [isChargeCard, setIsChargeCard] = React.useState(false);
  const [isPaidVendor, setIsPaidVendor] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const onSubmit = async () => {
    const body = {
      "user_id": await LoggedUserInfo.getLoggedUserId(),
      "concierge_id": conciergeId,
      "first_name": fName,
      "last_name": lastName,
      "drop_address": dropOffAddress,
      "drop_datetime": dropOffDate,
      "pickup_date": pickUpOffDateDate,
      "pickup_location": pickUpLocation,
      "pickup_address": pickUpAddress,
      "notes": specialInstructions,
      "payment_method": paymentOption,
      "total_price": "120",
    };
    setLoading(true);
    axios.post(Api.BASE_URL + Api.POST_CONCIERGE, body)
        .then(function (response) {
          console.log(response);
          //Navigate to Home Screen
          // props.navigation.navigate("SuccessScreen");
          loadInBrowser(response.data.Message);
          // Hide Loader
          setLoading(false);
        })
        .catch(function (error) {
          // Log show
          console.log(error);

          Toast.show({
            text: "Something Wrong or Empty Filed",
            buttonText: "Okay",
            type: "danger",
          });

          // Hide Loader
          setLoading(false);
        });
  };
  const loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => Toast.show({
      text: err,
      buttonText: "Okay",
      type: "danger",
    }));
  };
  return (
      <Root>
        <View>
          {/* Loading Screen Start*/}
          <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={"Loading..."}
              textStyle={{color: colors.buttonBgColor}}
          />
          <ScrollView>
            <View>
              {/* ---- Header ------*/}
              <NavigationBar title="Information" url="ConciergeScreen" navigation={props}/>
              <View style={style.formDivForTwoColumn}>
                <View>
                  <Text style={{margin: 2}}>First name</Text>
                  <TextInput style={style.inputFieldHalf} onChangeText={fName => setFName(fName)}/>
                  {FNameErr ? <Text style={style.errorMessage}>First name required !</Text> : null}
                </View>

                <View>
                  <Text style={{margin: 2}}>Last name</Text>
                  <TextInput style={style.inputFieldHalf}
                             onChangeText={lastName => setLastName(lastName)}/>
                  {lastNameErr ? <Text style={style.errorMessage}>Last name required !</Text> : null}
                </View>
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Name of Pick-Up Location</Text>
                <TextInput style={style.inputField}
                           onChangeText={pickUpLocation => setPickUpLocation(pickUpLocation)}/>
                {pickUpLocationErr ?
                    <Text style={style.errorMessage}>Name of Pick-Up Location required !</Text> : null}
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Pick Up Address</Text>
                <TextInput style={style.inputField}
                           onChangeText={pickUpAddress => setPickUpAddress(pickUpAddress)}/>
                {pickUpAddressErr ?
                    <Text style={style.errorMessage}>Pick Up Address required !</Text> : null}
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Pick Up Date/Time</Text>
                <DatePicker
                    minimumDate={new Date()}
                    date={pickUpOffDateDate}
                    onDateChange={setPickUpOffDateDate}
                    mode="datetime"
                    style={{width: width}}
                />
                {/*<TextInput style={style.inputField}*/}
                {/*           onChangeText={pickUpOffDateDate => setPickUpOffDateDate(pickUpOffDateDate)} />*/}
                {/*{pickUpOffDateDateErr ? <Text style={style.errorMessage}>Pick Up Date/Time required !</Text> : null}*/}
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Drop Off Address</Text>
                <TextInput style={style.inputField}
                           onChangeText={dropOffAddress => setDropOffAddress(dropOffAddress)}/>
                {dropOffAddressErr ?
                    <Text style={style.errorMessage}>Drop Off Address required !</Text> : null}
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Drop Off Date/Time</Text>
                <DatePicker
                    date={dropOffDate}
                    onDateChange={setDropOffDateDate}
                    mode="datetime"
                    style={{width: width}}
                />
                {/*<TextInput style={style.inputField} onChangeText={dropOffDate => setDropOffDateDate(dropOffDate)} />*/}
                {/*{dropOffDateErr ? <Text style={style.errorMessage}>Breed/Type required !</Text> : null}*/}
              </View>

              <View style={style.formDiv}>
                <Text style={{margin: 2}}>Special Instructions</Text>
                <TextInput style={style.inputField}
                           onChangeText={specialInstructions => setSpecialInstructions(specialInstructions)}/>
                {specialInstructionsErr ?
                    <Text style={style.errorMessage}>Special Instructions required !</Text> : null}

              </View>

              <Text style={{marginLeft: 35, fontWeight: "bold"}}>Payment Method</Text>
              <TouchableOpacity onPress={function () {
                setPaymentOption("Paypal");
              }
              }>
                <View style={style.formDivForTwoColumn}>
                  <CheckBox
                      checked={isChargeCard}
                      title="Charge My Card"
                      onPress={function () {
                        isChargeCard ? setIsChargeCard(false) :
                            setIsChargeCard(true);
                      }}
                  />

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={function () {
                setPaymentOption("I already paid the vendor");
              }
              }>
                <View style={style.formDivForTwoColumn}>
                  <CheckBox
                      checked={isPaidVendor}
                      title="I already paid the vendor"
                      onPress={function () {
                        isPaidVendor ? setIsPaidVendor(false) :
                            setIsPaidVendor(true);
                      }}
                  />

                </View>
              </TouchableOpacity>
              {/*--- Warning Field -----*/}
              <View style={style.formDiv}>
                <Text style={{fontWeight: "bold", padding: 10, color: colors.assColor}}>
                  Total Price: $120
                </Text>
              </View>

              <View style={{
                paddingStart: (widthHalf + 40) / 4,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10
              }}>
                <Button style={style.getStartBut} onPress={function () {
                  setFNameErr(false);
                  setLastNameErr(false);
                  setPickUpLocationErr(false);
                  setPickUpAddressErr(false);
                  setPickUpOffDateDateErr(false);
                  setDropOffAddressErr(false);
                  if (!Validators.isEmpty(fName)) {
                    setFNameErr(true);
                  }
                  if (!Validators.isEmpty(lastName)) {
                    setLastNameErr(true);
                  }
                  if (!Validators.isEmpty(pickUpLocation)) {
                    setPickUpLocationErr(true);
                  }
                  if (!Validators.isEmpty(pickUpAddress)) {
                    setPickUpAddressErr(true);
                  }
                  if (!Validators.isEmpty(pickUpOffDateDate)) {
                    setPickUpOffDateDateErr(true);
                  }
                  if (!Validators.isEmpty(dropOffAddress)) {
                    setDropOffAddressErr(true);
                  } else {
                    onSubmit();
                  }

                }}>
                  <Text style={{fontSize: 18, fontWeight: "bold"}}>Pay & Book Now</Text>
                </Button>
              </View>


            </View>
          </ScrollView>
        </View>
      </Root>
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
    color: colors.black,
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
    color: colors.black,
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
    flexDirection: "row",

  },
});
export default ConciergeInformation;

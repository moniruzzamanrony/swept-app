import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import Text from "react-native-paper/src/components/Typography/Text";
import { colors } from "../theme/Colors";
import { Button } from "native-base";

const VirtualPerAssScreen = () => {
  const [getResponse, setGetResponse] = React.useState([]);
  const [details, setDetails] = React.useState("");
  const [detailsErr, setDetailsErr] = React.useState("");
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
      },
      {
        id: 2,
        title: "Essay",
      }, {
        id: 3,
        title: "Vacation Planning/\n" +
          "Research",
      }, {
        id: 4,
        title: "Create a PowerPoint\n" +
          "Presentation\n",
      }, {
        id: 5,
        title: "Internet research",
      }, {
        id: 6,
        title: "Interior Design\n" +
          "Selections\n",
      }, {
        id: 7,
        title: "Online shopping",
      }, {
        id: 8,
        title: "Virtual Stylist",
      },
      {
        id: 9,
        title: "Build a website",
      }, {
        id: 10,
        title: "Sourcing Vendors",
      },
      {
        id: 11,
        title: "Make a Logo",
      },
      {
        id: 12,
        title: "Resume Editor",
      }, {
        id: 13,
        title: "Schedule Mobile\n" +
          "Beauty/Spa Service",
      },
    ]);
    console.log(getResponse);
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
                }}>
                  <View style={cardBg === res.id ? style.selectedCardStyleForTypeSelection : style.cardStyle}>
                    <Text style={{ margin: 10, fontSize: 12, textAlign: "center" }}>{res.title}</Text>
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
                     onChangeText={details => setDetails(details)} />
          {detailsErr ? <Text style={style.errorMessage}>Details required !</Text> : null}
        </View>
        <Text style={{ textAlign: "center", padding: 10, color: colors.assColor }}>
          You will Virtual Personal Assistant will send your
          quote based on the description
        </Text>
        <View style={{ paddingStart: 50, marginBottom: 10 }}>
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
    width: 150,
    height: 80,
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
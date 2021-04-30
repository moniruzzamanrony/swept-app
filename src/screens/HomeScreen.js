import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../theme/Colors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CleaningScreen from "./CleaningScreen";
import { Icon } from "native-base";

const HomeScreen = (props) => {
  const Tab = createMaterialBottomTabNavigator();
  const gotoCleaningScreen = () => {
    //Navigate to Home Screen
    props.navigation.navigate("CleaningScreen");
  };

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="black"
      barStyle={{ backgroundColor: colors.buttonBgColor }}
    >
      <Tab.Screen
        name="Feed"
        component={CleaningScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="arrow-back" style={{ fontSize: 25, color: colors.black }} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={CleaningScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <Icon name="arrow-back" style={{ fontSize: 25, color: colors.black }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CleaningScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="arrow-back" style={{ fontSize: 25, color: colors.black }} />
          ),
        }}
      />
    </Tab.Navigator>
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
});
export default HomeScreen;

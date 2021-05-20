import React from "react";
import { AsyncStorage } from "react-native";


export const getLoggedUserToken = () => {
  return getValue("token");
};

export const getLoggedUserId = async () => {
  return getValue("id");
};

export const getLoggedEmail = () => {
  return getValue("email");
};

export const getLoggedName = () => {
  return getValue("name");
};

export const getLoggedAddress = () => {
  return getValue("address");
};

export const getLoggedAvatar = () => {
  return getValue("avatar");
};

const getValue = async (key) => {
  try {
    const getValue = await AsyncStorage.getItem(key);
    return getValue;
  } catch (e) {
  }
};


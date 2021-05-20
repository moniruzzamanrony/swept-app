import React from "react";

export const checkPropertiesForEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key] === "")
      return false;
  }
  return true;
};


/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import "./src/config/InterceptorConfig";
import InterceptorConfig from "./src/config/InterceptorConfig";
import { useEffect } from "react";

AppRegistry.registerComponent(appName, () => App);

useEffect(() => {
  InterceptorConfig();
});


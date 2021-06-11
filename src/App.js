import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import CodeVerificationScreen from "./screens/CodeVerificationScreen";
import NewPasswordSetupScreen from "./screens/NewPasswordSetupScreen";
import CleaningScreen from "./screens/CleaningScreen";
import HomeScreen from "./screens/Dashboard/HomeScreen";
import OrderScreen from "./screens/Dashboard/OrderScreen";
import NotificationScreen from "./screens/Dashboard/NotificationScreen";
import MyProfileScreen from "./screens/Dashboard/MyProfileScreen";
import TimeAndDateScreen from "./screens/TimeAndDateScreen";
import AddressScreen from "./screens/AddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SuccessScreen from "./screens/SuccessScreen";
import HandymanScreen from "./screens/HandymanScreen";
import PatCareScreen from "./screens/PatCareScreen";
import ConciergeScreen from "./screens/ConciergeScreen";

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeVerificationScreen" component={CodeVerificationScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="NewPasswordSetupScreen" component={NewPasswordSetupScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="CleaningScreen" component={CleaningScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="OrderScreen" component={OrderScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="TimeAndDateScreen" component={TimeAndDateScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="AddressScreen" component={AddressScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="HandymanScreen" component={HandymanScreen}
                      options={{ headerShown: false }} />

        <Stack.Screen name="PatCareScreen" component={PatCareScreen}
                      options={{ headerShown: false }} />
        <Stack.Screen name="ConciergeScreen" component={ConciergeScreen}
                      options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

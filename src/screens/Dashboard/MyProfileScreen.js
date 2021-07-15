import React, { useEffect, useState } from "react";
import {
  AsyncStorageStatic as AsyncStorage,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NavigationBar from "../../navigation/NavigationBar";
import { Text } from "react-native-elements";
import { colors } from "../../theme/Colors";
import axios from "axios";
import { Api } from "../../contants/Api";
import { Button, Icon, Root } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { launchImageLibrary } from "react-native-image-picker";

const MyProfileScreen = (props) => {
  const [userId, setUserId] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameDisable, setNameDisable] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailDisable, setEmailDisable] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [phoneDisable, setPhoneDisable] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [addressDisable, setAddressDisable] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditButVisible, setEditButVisible] = useState(true);
  const [profilePicturePath, setProfilePicturePath] = useState("");
  const [isProfilePicFound, setIsProfilePicFound] = useState(false);
  const [width, setWidth] = useState(Dimensions.get("window").width - 50);
  const [widthHalf, setWidthHalf] = useState((Dimensions.get("window").width / 2) + 50);


  useEffect(() => {

    getProfileDetails();
    console.log("this will run the first time the component renders!");
  }, []);

  const getProfileDetails = () => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.GET_PROFILE)
      .then(function(response) {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone);
        setAddress(response.data.user.address);
        setUserId(response.data.user.id);
        setProfilePicturePath(response.data.user.avatar);
        // Hide Loader
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        // Hide Loader
        setLoading(false);
      });
  };
  const logout = () => {
    removeToken("token");
    props.navigation.navigate("LoginScreen");
  };

  const editProfile = () => {
    setNameDisable(true);
    setEmailDisable(false);
    setPhoneDisable(true);
    setAddressDisable(true);
    setEditButVisible(false);

  };
  const removeToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  const updateProfile = () => {
    setNameDisable(false);
    setEmailDisable(false);
    setPhoneDisable(false);
    setAddressDisable(false);
    setEditButVisible(true);

    /* Multipart Data Send*/
    const bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("phone", phone);
    bodyFormData.append("address", address);
    bodyFormData.append("avatar", { uri: profilePicturePath, name: "image.jpg", type: "image/jpeg" });
    // Show Loader
    setLoading(true);
    const config = {
      method: "post",
      url: Api.BASE_URL + Api.UPDATE_PROFILE + "/" + userId,
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    };

    axios(config)
      .then(function(response) {
        // getProfileDetails();
        console.log(response);
        // Hide Loader
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        // Hide Loader
        setLoading(false);
      });
  };

  /* Image Picker */
  const options = {
    title: "Pick Your Profile Picture",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const uploadProfileImage = () => {
    launchImageLibrary(options, response => {
      setProfilePicturePath(response.uri);
      setIsProfilePicFound(true);
    });
  };
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
    getStartBut: {
      width: widthHalf / 2,
      height: 50,
      margin: 20,
      marginTop: 30,
      backgroundColor: colors.buttonBgColor,
      color: colors.black,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
    },
    errorMessage: {
      fontSize: 11,
      color: colors.offRed,
    },
    formDiv: {
      marginLeft: 28,
      marginRight: 28,
      marginBottom: 10,

    },
  });
  return (
    <Root>
      {/* Loading Screen Start*/}
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        textStyle={{ color: colors.buttonBgColor }}
      />
      <ScrollView>
        <View>
          {/* ---- Header ------*/}
          <NavigationBar title="Profile" url="HomeScreen" navigation={props} />
          <TouchableOpacity onPress={function() {
            uploadProfileImage();
          }}>
            <View style={{
              justifyContent: "center",
              alignItems: "center", margin: 10,
            }}>
              {isProfilePicFound ?
                <Image
                  source={{ uri: profilePicturePath }}
                  style={{
                    width: 120, height: 120, borderRadius: 120 / 2, borderWidth: 3,
                    borderColor: "#ff8b7e",
                  }}
                /> :
                profilePicturePath == null ? <Image
                    source={require("../../../assets/avatar/profile.png")}
                    style={{
                      width: 120, height: 120, borderRadius: 120 / 2, borderWidth: 3,
                      borderColor: "#ff8b7e",
                    }} /> :
                  <Image
                    source={{ uri: Api.IMAGE_VIEW_BASE_URL + "avatar/" + profilePicturePath }}
                    style={{
                      width: 120, height: 120, borderRadius: 120 / 2, borderWidth: 3,
                      borderColor: "#ff8b7e",
                    }} />
              }

            </View>
          </TouchableOpacity>
          {/*Input Field*/}
          <View style={style.formDiv}>
            <Text style={{ margin: 2 }}>Name</Text>
            <TextInput style={style.inputField} onChangeText={name => setName(name)}
                       editable={nameDisable} value={name} />
          </View>
          {isEditButVisible ?
            <View style={style.formDiv}>
              <Text style={{ margin: 2 }}>Email</Text>
              <TextInput style={style.inputField} onChangeText={phoneOrEmail => setEmail(phoneOrEmail)}
                         editable={emailDisable} value={email} />
            </View> : null}


          <View style={style.formDiv}>
            <Text>Phone No.</Text>
            <TextInput style={style.inputField} onChangeText={phone => setPhone(phone)}
                       editable={phoneDisable} value={phone} />
          </View>

          <View style={style.formDiv}>
            <Text style={{ margin: 2 }}>Address</Text>
            <TextInput style={style.inputField} onChangeText={address => setAddress(address)}
                       editable={addressDisable} value={address} />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {isEditButVisible ?
              <Button style={style.getStartBut} onPress={function() {
                editProfile();
              }}>
                <Icon name="md-create-outline" style={{ fontSize: 18, color: colors.black }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}>Edit</Text>
              </Button>
              :
              <Button style={style.getStartBut} onPress={function() {
                updateProfile();
              }}>
                <Icon name="md-create-outline" style={{ fontSize: 18, color: colors.black }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}>Update</Text>
              </Button>
            }


            <Button style={style.getStartBut} onPress={function() {
              logout();
            }}>
              <Icon name="md-power" style={{ fontSize: 18, color: colors.black }} />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}>Logout</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

export default MyProfileScreen;

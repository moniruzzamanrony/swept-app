import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Root, Toast } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../theme/Colors";
import NavigationHeaderWithOutBack from "../../navigation/NavigationHeaderWithOutBack";
import axios from "axios";
import { Api } from "../../contants/Api";

const NotificationScreen = () => {
  // UI SETUP
  const [loading, setLoading] = useState(false);

  const [handimenOrders, setHandimenOrders] = useState([]);

  const [virtualAssistantOrders, setVirtualAssistantOrders] = useState([]);

  const [spaOrders, setSpaOrders] = useState([]);

  const [petCareOrders, setPetCareOrders] = useState([]);

  const [personalItemsOrder, setPersonalItemsOrder] = useState([]);

  const [conciergeItemsOrder, setConciergeItemsOrder] = useState([]);

  const [cleaningOrder, setCleaningOrder] = useState([]);

  useEffect(() => {
    callGetApi();
  }, {});

  const callGetApi = () => {
    setLoading(true);
    axios.get(Api.BASE_URL + Api.GET_ORDER_LIST_BY_ID)
      .then(function(response) {
        setHandimenOrders(response.data.handimen_orders);
        setVirtualAssistantOrders(response.data.virtual_assistant_orders);
        setSpaOrders(response.data.spa_orders);
        setPetCareOrders(response.data.pet_care_orders);
        setPersonalItemsOrder(response.data.personal_item_orders);
        setConciergeItemsOrder(response.data.concierge_orders);
        setCleaningOrder(response.data.cleaning_orders);
        console.log(response.data);

        setLoading(false);
      })
      .catch(function(error) {
        setLoading(false);
        console.warn(error);
        Toast.show({
          text: "Something Wrong ",
          buttonText: "Okay",
          type: "danger",
        });
      });
  };


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
      {/* ---- Header ------*/}
      <NavigationHeaderWithOutBack title="Notification" />

      {/*<View style={{ alignItems: "center", marginTop: 20 }}>*/}
      {/*  <View style={{ flexDirection: "row", marginBottom: 10 }}>*/}

      {/*    /!*--- delivered But----*!/*/}
      {/*    <View style={style.nonSelectedBut}>*/}
      {/*      <Button title="delivered" />*/}
      {/*    </View>*/}
      {/*    /!*--- Complete But----*!/*/}
      {/*    <View style={style.nonSelectedBut}>*/}
      {/*      <Button title="Complete"  />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</View>*/}
      <ScrollView>

        {/*------Handimen Orders-------*/}
        <Text style={style.headerbg}> Handimen Orders</Text>
        <View style={style.container}>
          <FlatList
            data={handimenOrders}
            renderItem={({ item }) => {
              return (

                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.service_name} - {item.house_type}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null


              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>


        {/*------{Virtual Assistant -/*-------*/}
        <Text style={style.headerbg}> Virtual Assistant</Text>
        <View style={style.container}>
          <FlatList
            data={virtualAssistantOrders}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.service_type} </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>

        {/*------{Spa -/*-------*/}
        <Text style={style.headerbg}> Spa</Text>
        <View style={style.container}>
          <FlatList
            data={spaOrders}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.spa_id} </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>

        {/*------ PER CARE/*-------*/}
        <Text style={style.headerbg}> Pet Care</Text>
        <View style={style.container}>
          <FlatList
            data={petCareOrders}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.pet_name} </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>


        {/*------ Personal Items -------*/}
        <Text style={style.headerbg}> Personal Items</Text>
        <View style={style.container}>
          <FlatList
            data={personalItemsOrder}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.item_id} - {item.concierge_id}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>

        {/*------ Concierge -------*/}
        <Text style={style.headerbg}> Concierge</Text>
        <View style={style.container}>
          <FlatList
            data={conciergeItemsOrder}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.concierge_id}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.pickup_date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>

        {/*------ Cleaning -------*/}

        <Text style={style.headerbg}> Cleaning</Text>
        <View style={style.container}>
          <FlatList
            data={cleaningOrder}
            renderItem={({ item }) => {
              return (
                item.status == 1 ?
                  <View style={{ justifyContent: "center", backgroundColor: colors.white, marginBottom: 2 }}>
                    <View style={{
                      flexDirection: "row",
                      height: 60,
                    }}>
                      {/*--- delivered But----*/}
                      <View style={{ marginTop: 10 }}>
                        <Image source={require("../../../assets/icons/order_icon.png")} />
                      </View>
                      {/*--- Complete But----*/}
                      <View style={{ padding: 3 }}>
                        <Text style={{ fontWeight: "bold" }}> {item.clean_type} - {item.frequency}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          {/*--- Time----*/}
                          <View>
                            <Text> {item.date} | ${item.total_price} |</Text>
                          </View>
                          {/*--- Complete But----*/}
                          <View>
                            <Text style={{ fontWeight: "bold", color: colors.greenColor }}> delivered</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                  : null
              );
            }
            }
            keyExtractor={item => item.id}
          />
        </View>

      </ScrollView>
    </Root>
  );
};
const style = StyleSheet.create({
  nonSelectedBut: {
    width: 177,
    backgroundColor: "#f9c2ff",
    color: colors.white,
  },
  SelectedBut: {},
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerbg: {
    padding: 15,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: colors.buttonBgColor,
    color: colors.black,
  },
});
export default NotificationScreen;

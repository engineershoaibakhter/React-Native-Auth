import { StyleSheet, Text, View, Pressable } from "react-native";
import React,{useState,useEffect} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const main = () => {
  
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.push("./login");
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 20 }}>Main Screen</Text>
      <Pressable onPress={Logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default main;

const styles = StyleSheet.create({});

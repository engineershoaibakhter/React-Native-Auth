import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const login = () => {
  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
      <View style={styles.loginContainer}>
        <View style={styles.loginHeading}>
          <Text style={styles.loginHeadingContent}>
            Welcome back! We've missed your presence here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  loginHeading: {
    marginTop: 100,
  },
  loginHeadingContent: {
    fontSize: 30,
    fontWeight: "500",
  },
});

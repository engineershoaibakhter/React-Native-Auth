import { ScrollView,TouchableOpacity,TextInput,KeyboardAvoidingView, StyleSheet, Text, View, Platform, Pressable } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from '@expo/vector-icons';
import {Link} from 'expo-router'


const login = () => {
    const [passwordVisible,setPasswordVisible]=React.useState(false);
  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"}>
      <View style={styles.loginContainer}>
        <View style={styles.loginHeading}>
          <Text style={styles.loginHeadingContent}>
            Welcome back! We've missed your presence here
          </Text>
        </View>
        <View style={styles.inputContainer}>
            
            <TextInput placeholder="Enter your Email" placeholderTextColor={"black"} style={styles.textEmailInput} keyboardType="email-address"></TextInput>
            
            <View style={styles.inputPasswordContainer}>
            <TextInput placeholder="Enter your Password" placeholderTextColor={"black"} style={styles.textPasswordInput} secureTextEntry={!passwordVisible}></TextInput>
                <TouchableOpacity style={styles.eyeIcon} onPress={()=>setPasswordVisible(!passwordVisible)}>
                <Ionicons name={passwordVisible ? 'eye-off' : 'eye'}size={30} color="black"/>
                </TouchableOpacity>
            </View>

            <View style={styles.forgotPasswordContainer}>
                <Link href={'./forgot-password'} style={styles.forgotPasswordText}>Forgot Password?</Link>
            </View>
            
            

        </View>
      </View>
      </KeyboardAvoidingView>
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
  inputContainer:{
    marginVertical:40,
    marginHorizontal:20,
  },
  textEmailInput:{
    backgroundColor:'white',
    borderRadius:10,
    color:'black',
    height:70,
    borderColor:"black",
    borderWidth:2,
    padding:10,
    fontSize:20,
    marginBottom: 20,
    flex:1
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    paddingRight: 10,
    height: 70,
    width: '100%',
  },
  textPasswordInput: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  
});

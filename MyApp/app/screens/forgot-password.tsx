import { ScrollView,TouchableOpacity,TextInput,KeyboardAvoidingView, StyleSheet, Text, View, Platform, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Link} from 'expo-router'


const forgotPassword = () => {
    const [passwordVisible,setPasswordVisible]=React.useState(false);
    const [isPressingLogin, setIsPressingLogin] = React.useState(false);
  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} keyboardVerticalOffset={Platform.select({ ios: 0, android: 1000 })}>
      <View style={styles.loginContainer}>
        <View style={styles.loginHeading}>
          <Text style={styles.loginHeadingContent}>
            Forgot Password?
          </Text>
          <Text style={styles.loginTextContent}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
        </View>
        <View style={styles.inputContainer}>
            
            <TextInput placeholder="Enter your Email" placeholderTextColor={"black"} style={styles.textEmailInput} keyboardType="email-address"></TextInput>

            <Pressable style={[styles.loginButton, isPressingLogin && styles.buttonPressing]} onPressIn={()=>setIsPressingLogin(true)} onPressOut={() => setIsPressingLogin(false)}>
                <Text style={[styles.loginButtonText,isPressingLogin && styles.textProssing ]}>Send Code</Text>
            </Pressable>

        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  loginHeading: {
    marginTop: 60,
  },
  loginHeadingContent: {
    fontSize: 30,
    fontWeight: "500",
  },
  loginTextContent:{
    fontSize: 20,
    marginTop:20
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
  loginButton:{
    backgroundColor:'black',
    borderRadius:10,
    margin:15,
    height:50,
    justifyContent:"center",
    alignItems:"center"
},
loginButtonText:{
    color:'white',
    fontSize: 25,
    fontWeight: "400",
  },
  buttonPressing: {
    backgroundColor: '#d3d3d3',
},
textProssing:{
  color:"black"
}
});

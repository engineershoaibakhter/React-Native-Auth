import { ScrollView,TouchableOpacity,TextInput,KeyboardAvoidingView, StyleSheet, Text, View, Platform, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Link} from 'expo-router'
import axios from 'axios';


const resetPassword = () => {
    const [email,setEmail]=React.useState('');
    const [error,setError]=React.useState('')
    const [isPressingSendingCode, setIsPressingSendingCode] = React.useState(false);

    const sendCode=async ()=>{
      try {
        const response=await axios.post('http://192.168.0.18:5000/api/auth/reset_password',{email})
        alert("Email is sent with successfully. Please check your Email")  
      } catch (error) {
        setError("User Not Found")
        console.log(error);
      }
    }
  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} keyboardVerticalOffset={Platform.select({ ios: 0, android: 1000 })}>
      <View style={styles.sendingContainer}>
        <View style={styles.sendingHeading}>
          <Text style={styles.sendingHeadingContent}>
            Forgot Password?
          </Text>
          <Text style={styles.sendingTextContent}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
        </View>
        <View style={styles.inputContainer}>
            
            <TextInput placeholder="Enter your Email" placeholderTextColor={"black"} style={styles.textEmailInput} keyboardType="email-address" value={email} onChangeText={setEmail}></TextInput>
            {error? <Text style={styles.errorText}>{error}</Text>:null}
            <Pressable style={[styles.sendingButton, isPressingSendingCode && styles.buttonPressing]} onPress={sendCode} onPressIn={()=>setIsPressingSendingCode(true)} onPressOut={() => setIsPressingSendingCode(false)}>
                <Text style={[styles.sendingButtonText,isPressingSendingCode && styles.textProssing ]}>Send Code</Text>
            </Pressable>

        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default resetPassword;

const styles = StyleSheet.create({
  sendingContainer: {
    flex: 1,
  },
  sendingHeading: {
    marginTop: 60,
  },
  sendingHeadingContent: {
    fontSize: 30,
    fontWeight: "500",
  },
  sendingTextContent:{
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
  sendingButton:{
    backgroundColor:'black',
    borderRadius:10,
    margin:15,
    height:50,
    justifyContent:"center",
    alignItems:"center"
},
sendingButtonText:{
    color:'white',
    fontSize: 25,
    fontWeight: "400",
  },
  buttonPressing: {
    backgroundColor: '#d3d3d3',
},
textProssing:{
  color:"black"
},
errorText: {
  color: 'red',
  marginBottom: 20,
},
});

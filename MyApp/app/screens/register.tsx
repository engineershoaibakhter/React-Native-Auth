import { ScrollView,TouchableOpacity,TextInput,KeyboardAvoidingView, StyleSheet, Text, View, Platform, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Link,useRouter} from 'expo-router'


const Register = () => {
    const [passwordVisible,setPasswordVisible]=React.useState(false);
    const [confirmPasswordVisible,setConfirmPasswordVisible]=React.useState(false);
    const [isPressingLogin, setIsPressingLogin] = React.useState(false);
    const router = useRouter();

  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} keyboardVerticalOffset={Platform.select({ ios: 0, android: 1000 })}>
      <View style={styles.loginContainer}>
        <View style={styles.loginHeading}>
          <Text style={styles.loginHeadingContent}>
            Register to Start Exploring
          </Text>
        </View>
        <View style={styles.inputContainer}>

        <TextInput placeholder="Username" placeholderTextColor={"black"} style={styles.textInput}></TextInput>
            <TextInput placeholder="Email" placeholderTextColor={"black"} style={styles.textInput} keyboardType="email-address"></TextInput>
            
            <View style={styles.inputPasswordContainer}>
            <TextInput placeholder="Password" placeholderTextColor={"black"} style={styles.textPasswordInput} secureTextEntry={!passwordVisible}></TextInput>
                <TouchableOpacity style={styles.eyeIcon} onPress={()=>setPasswordVisible(!passwordVisible)}>
                <Ionicons name={passwordVisible ? 'eye' : 'eye-off'}size={30} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputPasswordContainer}>
            <TextInput placeholder="Password" placeholderTextColor={"black"} style={styles.textPasswordInput} secureTextEntry={!confirmPasswordVisible}></TextInput>
                <TouchableOpacity style={styles.eyeIcon} onPress={()=>setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={30} color="black"/>
                </TouchableOpacity>
            </View>

            <Pressable onPress={()=>router.push('screens/otp-verification')} style={[styles.loginButton, isPressingLogin && styles.buttonPressing]} onPressIn={()=>setIsPressingLogin(true)} onPressOut={() => setIsPressingLogin(false)}>
                <Text style={[styles.loginButtonText,isPressingLogin && styles.textProssing ]}>Register</Text>
            </Pressable>

            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or Register with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialLoginContainer}>
              <Pressable style={styles.socialButton}>
              <FontAwesome name="facebook" size={40} color="blue" />
              </Pressable>
              <Pressable style={styles.socialButton}>
              <FontAwesome name="google" size={40} color="red" />
              </Pressable>
              <Pressable style={styles.socialButton}>
              <FontAwesome name="apple" size={40} color="black" />
              </Pressable>
            </View>
            
            <View style={styles.registerLinkContainer}>
              <Text style={styles.registerLinkText}>
              Already have an account? <Link href='./login' style={styles.registerLink}>Login Now</Link>
              </Text>
            </View>

        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  loginHeading: {
    marginTop: 30,
  },
  loginHeadingContent: {
    fontSize: 30,
    fontWeight: "500",
  },
  inputContainer:{
    marginVertical:30,
    marginHorizontal:20,
  },
  textInput:{
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
    marginBottom:20
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
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'grey',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
  },
  registerLinkContainer:{
    marginTop:60,
    alignItems:"center",
  },
  registerLinkText:{
    fontSize:20
  },
  registerLink:{
    fontWeight:"500"
  },
  buttonPressing: {
    backgroundColor: '#d3d3d3',
},
textProssing:{
  color:"black"
}
});

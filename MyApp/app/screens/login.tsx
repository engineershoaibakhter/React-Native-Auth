import { ScrollView,TouchableOpacity,TextInput,KeyboardAvoidingView, StyleSheet, Text, View, Platform, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Link,useRouter} from 'expo-router'
import axios from 'axios';


const login = () => {
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState(''); 
    const [passwordVisible,setPasswordVisible]=React.useState(false);
    const [isPressingLogin, setIsPressingLogin] = React.useState(false);
    const [error,setError]=React.useState('')

    const router=useRouter();

    const handleLogin=async ()=>{
      if(!email || !password){
        setError('Please fill all the fields');
        return;
      }

      try {
        const response=await axios.post('http://localhost:5000/api/auth/login',{email,password});
        
          router.push('./main');

      } catch (error) {
        setError('Credential Failed. '+error);
      }
    };

  return (
    <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} keyboardVerticalOffset={Platform.select({ ios: 0, android: 1000 })}>
      <View style={styles.loginContainer}>
        <View style={styles.loginHeading}>
          <Text style={styles.loginHeadingContent}>
            Welcome back! We've missed your presence here
          </Text>
        </View>
        <View style={styles.inputContainer}>
            
            <TextInput placeholder="Enter your Email" placeholderTextColor={"black"} style={styles.textEmailInput} keyboardType="email-address" value={email} onChangeText={setEmail}></TextInput>
            
            <View style={styles.inputPasswordContainer}>
            <TextInput placeholder="Enter your Password" placeholderTextColor={"black"} style={styles.textPasswordInput} secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword}></TextInput>
                <TouchableOpacity style={styles.eyeIcon} onPress={()=>setPasswordVisible(!passwordVisible)}>
                <Ionicons name={passwordVisible ? 'eye' : 'eye-off'}size={30} color="black"/>
                </TouchableOpacity>
            </View>

            {error? <Text style={styles.errorText}>{error}</Text>:null}

            <View>
                <Link href={'./forgot-password'} style={styles.forgotPassword}>Forgot Password?</Link>
            </View>

            <Pressable style={[styles.loginButton, isPressingLogin && styles.buttonPressing]} onPressIn={()=>setIsPressingLogin(true)} onPressOut={() => setIsPressingLogin(false)} onPress={handleLogin}>
                <Text style={[styles.loginButtonText,isPressingLogin && styles.textProssing ]}>Login</Text>
            </Pressable>

            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or Login with</Text>
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
              Don’t have an account? <Link href='./register' style={styles.registerLink}>Register Now</Link>
              </Text>
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
    marginTop: 60,
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
forgotPassword:{
    padding:10,
      textAlign:"right",
    fontSize:17
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
    marginTop:120,
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
},
errorText:{
  color:"red",
  textAlign:'center',
  marginBottom:10
}

});

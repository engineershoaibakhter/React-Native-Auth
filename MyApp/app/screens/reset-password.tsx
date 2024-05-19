import {
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Platform,
    Pressable,
  } from "react-native";
  import React from "react";
  import { Ionicons, FontAwesome } from "@expo/vector-icons";
  import { Link, useRouter,useLocalSearchParams } from "expo-router";
  import axios from "axios";
  
  const Register = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
    const [isPressingLogin, setIsPressingLogin] = React.useState(false);
    const [isPressingCancel, setIsPressingCancel] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
  
    const router = useRouter();
    const {email} =useLocalSearchParams();
  
    const handleSubmit = async () => {
      if (!password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Password and Confirm Password do not match.");
        return;
      }
  
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/reset_password`,
          { email,password }
        );
        alert("Your Password is reset")
        router.push('./login')
      } catch (error) {
        setError("The password is not reset");
        console.log("The password is not reset"+error);
      }
    };
  
    return (
      <ScrollView indicatorStyle={"black"} style={{ padding: 10 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 1000 })}
        >
          <View style={styles.loginContainer}>
            <View style={styles.loginHeading}>
              <Text style={styles.loginHeadingContent}>
                Reset Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"black"}
                  style={styles.textPasswordInput}
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                ></TextInput>
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye" : "eye-off"}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={"black"}
                  style={styles.textPasswordInput}
                  secureTextEntry={!confirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                ></TextInput>
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  <Ionicons
                    name={confirmPasswordVisible ? "eye" : "eye-off"}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
  
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
  
              
              <View style={styles.buttons}>
    <Pressable
      onPress={handleSubmit}
      style={[
        styles.loginButton,
        isPressingLogin && styles.buttonPressing,
      ]}
      onPressIn={() => setIsPressingLogin(true)}
      onPressOut={() => setIsPressingLogin(false)}
    >
      <Text
        style={[
          styles.loginButtonText,
          isPressingLogin && styles.textProssing,
        ]}
      >
        Submit
      </Text>
    </Pressable>

    <Pressable
    //   onPress={handleCancel} // You need to implement handleCancel function
      style={[
        styles.cancelButton,
        isPressingCancel && styles.buttonPressingCancel,
      ]}
      onPressIn={() => setIsPressingCancel(true)}
      onPressOut={() => setIsPressingCancel(false)}
    >
      <Text
        style={[
          styles.CancelButtonText,
          isPressingCancel && styles.textProssingCancel,
        ]}
      >
        Cancel
      </Text>
    </Pressable>

  
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
    inputContainer: {
      marginVertical: 30,
      marginHorizontal: 20,
    },
    textInput: {
      backgroundColor: "white",
      borderRadius: 10,
      color: "black",
      height: 70,
      borderColor: "black",
      borderWidth: 2,
      padding: 10,
      fontSize: 20,
      marginBottom: 20,
      flex: 1,
    },
    inputPasswordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 2,
      paddingRight: 10,
      height: 60,
      width: "100%",
      marginBottom: 20,
    },
    textPasswordInput: {
      flex: 1,
      color: "black",
      fontSize: 20,
      padding: 10
    },
    eyeIcon: {
      marginLeft: 10,
    },
    buttons:{
    flexDirection:'row',
    justifyContent: 'center',
  marginTop: 20,
    },
    loginButton: {
      backgroundColor: "black",
      borderRadius: 10,
      margin: 15,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal:10,
      width:150,
    },
    cancelButton: {
        backgroundColor: "black",
        borderRadius: 10,
        margin: 15,
        height: 50,
        width:150,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal:10
      },
    loginButtonText: {
      color: "white",
      fontSize: 25,
      fontWeight: "400",
    },
    CancelButtonText: {
        color: "white",
        fontSize: 25,
        fontWeight: "400",
      },
   
    buttonPressing: {
      backgroundColor: "#d3d3d3",
    },
    textProssing: {
      color: "black",
    },
    buttonPressingCancel: {
        backgroundColor: "#d3d3d3",
      },
      textProssingCancel: {
        color: "black",
      },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: 10,
    },
  });
  
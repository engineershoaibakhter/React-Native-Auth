import { Image, StyleSheet,View,Text, Platform } from 'react-native';
import {Link} from 'expo-router'

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  const [isPressingRegister,setIsPressingRegister]=React.useState(false);
  const [isPressingLogin,setIsPressingLogin]=React.useState(false);

  return (
    <>
    <ThemedView style={styles.container}>
      <Image style={styles.bgImage} source={require('../../assets/images/bg-auth-image.png')}></Image>
      <View style={styles.textContent}>
       <Link href='../screens/login' style={[styles.textLogin , isPressingLogin && styles.loginPress]} onPressIn={() => setIsPressingLogin(true)} onPressOut={() => setIsPressingLogin(false)}>Login</Link>
       <Link href='../screens/register' onPressIn={()=>setIsPressingRegister(true)} onPressOut={() => setIsPressingRegister(false)} style={[styles.textRegister, isPressingRegister && styles.registerPress]}>Register</Link>
      </View>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    // marginTop:50
    flex: 1,
  },
  bgImage:{
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 24,
    fontWeight: "400",
    color: 'white',
    marginBottom: 20, // Space between Login and Register
    backgroundColor: 'black',
    width: '80%',
    height: 50, // Adjust height according to your requirement
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textRegister:{
    fontSize: 24,
    fontWeight: "400",
    color: 'black',
    marginBottom: 20, // Space between Login and Register
    backgroundColor: 'white',
    width: '80%',
    height: 50, // Adjust height according to your requirement
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor:"black",
    borderWidth: 2,
  },
  registerPress:{
    backgroundColor:"black",
    color:"white"
  },
  loginPress:{
    backgroundColor:"#d3d3d3",
    color:"black"
  }
});

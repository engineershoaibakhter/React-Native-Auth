import { Image, StyleSheet,View,Text, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <>
    <ThemedView style={styles.container}>
      <Image style={styles.bgImage} source={require('../../assets/images/bg-auth-image.png')}></Image>
      <View style={styles.textContent}>
        <ThemedText style={styles.textLogin}>Login</ThemedText>
        <ThemedText style={styles.textRegister}>Register</ThemedText>
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
  }
});

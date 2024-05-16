import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

export default function OtpVerification() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Add verification logic here
    alert('OTP Verified: ' + otp.join(''));
  };

  const handleResend = () => {
    // Add resend logic here
    alert('OTP Resent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code we just sent on your email address.</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => inputs.current[index] = ref}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpInput}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>Didn't received code? <Text style={styles.resendLink}>Resend</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 20,
    // justifyContent: 'flex-start',
    marginTop:100,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 25,
    fontWeight:"500",
    backgroundColor:"white",
    marginHorizontal:10
  },
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 10,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  resendText: {
    fontSize: 20,
  },
  resendLink: {
    fontWeight: 'bold',
  },
});

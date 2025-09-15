import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../store/slices/authSlice';
import { AuthStackParamList } from '../../types';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mobileNumber, userType, isRegistering } = route.params;
  const dispatch = useAppDispatch();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');

  const otpRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (text && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For demo purposes, accept any 6-digit OTP
      if (otpString === '123456' || otpString.length === 6) {
        await dispatch(loginUser({ 
          mobileNumber: mobileNumber.replace(/\D/g, ''), 
          otp: otpString 
        })).unwrap();
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (timeLeft > 0) return;
    
    setResendLoading(true);
    
    // Simulate resending OTP
    setTimeout(() => {
      setResendLoading(false);
      setTimeLeft(60);
      setOtp(['', '', '', '', '', '']);
      Alert.alert('Success', 'OTP has been resent to your mobile number');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Enter OTP"
        onBackPress={() => navigation.goBack()}
        backgroundColor={Colors.backgroundSecondary}
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit verification code to{'\n'}
            <Text style={styles.phoneNumber}>{mobileNumber}</Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) otpRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                error && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <Button
          title="Verify OTP"
          onPress={handleVerifyOtp}
          loading={loading}
          disabled={otp.join('').length !== 6}
          style={styles.verifyButton}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
          </Text>
          {timeLeft > 0 ? (
            <Text style={styles.timerText}>
              Resend in {timeLeft}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp} disabled={resendLoading}>
              <Text style={[styles.resendLink, resendLoading && styles.disabled]}>
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneNumber: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 56,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF4ED',
  },
  otpInputError: {
    borderColor: Colors.error,
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  verifyButton: {
    marginTop: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  resendLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default OTPVerificationScreen;

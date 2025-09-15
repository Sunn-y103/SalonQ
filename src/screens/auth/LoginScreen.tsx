import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthStackParamList } from '../../types';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateMobileNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number.replace(/\D/g, ''));
  };

  const handleLogin = () => {
    setError('');
    
    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', {
        mobileNumber,
        userType: 'customer', // Default to customer for login
        isRegistering: false,
      });
    }, 1500);
  };

  const formatMobileNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    // Format as (XXX) XXX-XXXX if length > 6, XXX-XXXX if length > 3
    if (limited.length > 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    }
    return limited;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Sign In"
        onBackPress={() => navigation.goBack()}
        backgroundColor={Colors.backgroundSecondary}
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to receive an OTP
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Mobile Number"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChangeText={(text) => {
              const formatted = formatMobileNumber(text);
              setMobileNumber(formatted);
              setError('');
            }}
            keyboardType="phone-pad"
            error={error}
            maxLength={14} // For formatted number
          />

          <Button
            title="Send OTP"
            onPress={handleLogin}
            loading={loading}
            disabled={!mobileNumber.trim()}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.registerLink}>Register here</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  loginButton: {
    marginTop: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  registerText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;

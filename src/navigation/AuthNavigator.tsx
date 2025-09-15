import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CustomerRegisterScreen from '../screens/auth/CustomerRegisterScreen';
import OwnerRegisterScreen from '../screens/auth/OwnerRegisterScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegisterScreen} />
      <Stack.Screen name="OwnerRegister" component={OwnerRegisterScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

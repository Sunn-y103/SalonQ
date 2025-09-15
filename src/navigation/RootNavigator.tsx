import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store';
import { loadUser } from '../store/slices/authSlice';
import { RootStackParamList } from '../types';

import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import OwnerNavigator from './OwnerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    // You can replace this with a proper loading screen component
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="AuthStack" component={AuthNavigator} />
        ) : user?.userType === 'customer' ? (
          <Stack.Screen name="CustomerStack" component={CustomerNavigator} />
        ) : (
          <Stack.Screen name="OwnerStack" component={OwnerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomerStackParamList, CustomerTabsParamList } from '../types';
import AnimatedBottomTabBar from '../components/navigation/AnimatedBottomTabBar';

// Customer screens
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import HistoryScreen from '../screens/customer/HistoryScreen';
import FavoritesScreen from '../screens/customer/FavoritesScreen';
import WalletScreen from '../screens/customer/WalletScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';
import BookingFlowScreen from '../screens/customer/BookingFlowScreen';
import AppointmentDetailsScreen from '../screens/customer/AppointmentDetailsScreen';

const Stack = createNativeStackNavigator<CustomerStackParamList>();
const Tab = createBottomTabNavigator<CustomerTabsParamList>();

const CustomerTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
    </Tab.Navigator>
  );
};

const CustomerNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;

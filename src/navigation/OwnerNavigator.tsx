import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { OwnerStackParamList, OwnerTabsParamList } from '../types';

// Owner screens
import OwnerHomeScreen from '../screens/owner/OwnerHomeScreen';
import PaymentHistoryScreen from '../screens/owner/PaymentHistoryScreen';
import OwnerProfileScreen from '../screens/owner/OwnerProfileScreen';
import EmployeeManagementScreen from '../screens/owner/EmployeeManagementScreen';
import AddEmployeeScreen from '../screens/owner/AddEmployeeScreen';
import SalonSettingsScreen from '../screens/owner/SalonSettingsScreen';

const Stack = createNativeStackNavigator<OwnerStackParamList>();
const Tab = createBottomTabNavigator<OwnerTabsParamList>();

const OwnerTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'PaymentHistory':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={OwnerHomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="PaymentHistory" 
        component={PaymentHistoryScreen}
        options={{ tabBarLabel: 'Payments' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={OwnerProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const OwnerNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OwnerTabs" component={OwnerTabs} />
      <Stack.Screen name="EmployeeManagement" component={EmployeeManagementScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
      <Stack.Screen name="SalonSettings" component={SalonSettingsScreen} />
    </Stack.Navigator>
  );
};

export default OwnerNavigator;

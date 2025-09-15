import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';

const CustomerProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Customer'}</Text>
          <Text style={styles.phone}>{user?.mobileNumber}</Text>
        </View>
        
        <View style={styles.actionsSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: '#6B7280',
  },
  actionsSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  logoutButton: {
    borderColor: '#EF4444',
  },
});

export default CustomerProfileScreen;

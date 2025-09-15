import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAppDispatch } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';

const PaymentHistoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Payment History</Text>
        <Text style={styles.subtitle}>Track all your salon payments and earnings</Text>
        
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  actionsSection: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  logoutButton: {
    borderColor: '#EF4444',
  },
});

export default PaymentHistoryScreen;

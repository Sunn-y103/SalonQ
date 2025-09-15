import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/colors';

const WalletScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Wallet Balance Section */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Icon name="wallet-outline" size={24} color={Colors.primary} />
            <Text style={styles.balanceTitle}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₹1,250.00</Text>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Icon name="add-circle-outline" size={20} color={Colors.white} />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          <View style={styles.paymentMethodsContainer}>
            <TouchableOpacity style={styles.paymentMethod}>
              <View style={styles.paymentMethodIcon}>
                <Icon name="card-outline" size={24} color={Colors.primary} />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Online Payment</Text>
                <Text style={styles.paymentMethodSubtitle}>UPI, Cards, Net Banking</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentMethod}>
              <View style={styles.paymentMethodIcon}>
                <Icon name="cash-outline" size={24} color={Colors.success} />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Cash Payment</Text>
                <Text style={styles.paymentMethodSubtitle}>Pay at salon counter</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          <View style={styles.transactionsContainer}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Icon name="arrow-down" size={16} color={Colors.success} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Hair Cut & Styling</Text>
                  <Text style={styles.transactionDate}>Dec 15, 2024 • 2:30 PM</Text>
                </View>
                <Text style={styles.transactionAmount}>+₹500</Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Transactions</Text>
              <Icon name="chevron-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
    height: 32,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  balanceCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addMoneyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  paymentMethodsContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionsContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  viewAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default WalletScreen;

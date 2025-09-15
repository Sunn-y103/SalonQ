import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/colors';

const HistoryScreen: React.FC = () => {
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
        <Text style={styles.headerTitle}>History</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Visits</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹6,500</Text>
            <Text style={styles.statLabel}>Amount Spent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Appointments History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Appointments</Text>
          
          {[
            { id: 1, salon: 'The Sharp Side', service: 'Hair Cut & Styling', date: 'Dec 15, 2024', time: '2:30 PM', amount: 500, status: 'Completed' },
            { id: 2, salon: 'Elite Salon', service: 'Beard Trim', date: 'Nov 28, 2024', time: '4:00 PM', amount: 200, status: 'Completed' },
            { id: 3, salon: 'The Sharp Side', service: 'Hair Wash & Cut', date: 'Nov 10, 2024', time: '1:15 PM', amount: 400, status: 'Completed' },
          ].map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.salonInfo}>
                  <Text style={styles.salonName}>{appointment.salon}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{appointment.status}</Text>
                  </View>
                </View>
                <Text style={styles.appointmentAmount}>₹{appointment.amount}</Text>
              </View>
              
              <Text style={styles.serviceName}>{appointment.service}</Text>
              
              <View style={styles.appointmentFooter}>
                <View style={styles.dateTimeInfo}>
                  <Icon name="calendar-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.dateText}>{appointment.date}</Text>
                  <Icon name="time-outline" size={14} color={Colors.textSecondary} style={{ marginLeft: 12 }} />
                  <Text style={styles.timeText}>{appointment.time}</Text>
                </View>
                
                <TouchableOpacity style={styles.rateButton}>
                  <Icon name="star-outline" size={16} color={Colors.warning} />
                  <Text style={styles.rateButtonText}>Rate</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Appointments</Text>
            <Icon name="chevron-forward" size={16} color={Colors.primary} />
          </TouchableOpacity>
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
  statsSection: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
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
  appointmentCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  salonInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: '600',
  },
  appointmentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  serviceName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rateButtonText: {
    fontSize: 12,
    color: Colors.warning,
    fontWeight: '500',
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default HistoryScreen;

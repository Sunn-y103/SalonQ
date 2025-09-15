import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSalonById } from '../../store/slices/salonSlice';
import { CustomerStackParamList } from '../../types';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';

type Props = NativeStackScreenProps<CustomerStackParamList, 'BookingFlow'>;

const BookingFlowScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salonId } = route.params;
  const dispatch = useAppDispatch();
  const { currentSalon, isLoading } = useAppSelector(state => state.salon);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (salonId) {
      dispatch(fetchSalonById(salonId));
    }
  }, [dispatch, salonId]);

  // Generate next 7 days for booking
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
      });
    }
    return dates;
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour < 20; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      slots.push({
        id: `${hour}`,
        startTime: time,
        endTime: endTime,
        display: `${time} - ${endTime}`,
        available: Math.random() > 0.3, // 70% availability
      });
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    if (!currentSalon) return 0;
    return selectedServices.reduce((total, serviceId) => {
      const service = currentSalon.services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      Alert.alert('Error', 'Please select date, time, and at least one service');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Book appointment for ${selectedDate} at ${selectedTime}?\nTotal: $${calculateTotal()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => {
          Alert.alert('Success', 'Appointment booked successfully!');
          navigation.goBack();
        }},
      ]
    );
  };

  if (isLoading || !currentSalon) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading salon details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Book Appointment"
        onBackPress={() => navigation.goBack()}
        backgroundColor="#FFFFFF"
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Salon Info */}
          <View style={styles.salonInfo}>
            <Text style={styles.salonName}>{currentSalon.name}</Text>
            <Text style={styles.salonAddress}>{currentSalon.address}</Text>
          </View>

          {/* Date Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dateContainer}>
                {dates.map((dateItem) => (
                  <TouchableOpacity
                    key={dateItem.date}
                    style={[
                      styles.dateItem,
                      selectedDate === dateItem.date && styles.selectedDateItem,
                    ]}
                    onPress={() => setSelectedDate(dateItem.date)}
                  >
                    <Text style={[
                      styles.dayText,
                      selectedDate === dateItem.date && styles.selectedDateText,
                    ]}>
                      {dateItem.day}
                    </Text>
                    <Text style={[
                      styles.dayNumText,
                      selectedDate === dateItem.date && styles.selectedDateText,
                    ]}>
                      {dateItem.dayNum}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Time Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeItem,
                    !slot.available && styles.disabledTimeItem,
                    selectedTime === slot.startTime && styles.selectedTimeItem,
                  ]}
                  onPress={() => slot.available && setSelectedTime(slot.startTime)}
                  disabled={!slot.available}
                >
                  <Text style={[
                    styles.timeText,
                    !slot.available && styles.disabledTimeText,
                    selectedTime === slot.startTime && styles.selectedTimeText,
                  ]}>
                    {slot.display}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Services Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Services</Text>
            {currentSalon.services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceItem,
                  selectedServices.includes(service.id) && styles.selectedServiceItem,
                ]}
                onPress={() => handleServiceToggle(service.id)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>${service.price}</Text>
                </View>
                {selectedServices.includes(service.id) && (
                  <Icon name="checkmark-circle" size={24} color="#6366F1" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Total */}
          {selectedServices.length > 0 && (
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${calculateTotal()}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Book Appointment - $${calculateTotal()}`}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime || selectedServices.length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  salonInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  salonName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  salonAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateItem: {
    width: 60,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedDateItem: {
    borderColor: '#6366F1',
    backgroundColor: '#F0F0FF',
  },
  dayText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNumText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  selectedDateText: {
    color: '#6366F1',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  selectedTimeItem: {
    borderColor: '#6366F1',
    backgroundColor: '#F0F0FF',
  },
  disabledTimeItem: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  selectedTimeText: {
    color: '#6366F1',
  },
  disabledTimeText: {
    color: '#9CA3AF',
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedServiceItem: {
    borderColor: '#6366F1',
    backgroundColor: '#F0F0FF',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default BookingFlowScreen;

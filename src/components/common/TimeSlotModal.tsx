import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
  selectedDate?: string;
}

const { width, height } = Dimensions.get('window');

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  visible,
  onClose,
  onSelectTime,
  selectedDate,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate time slots based on the design
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const times = [
      '11 - 12', '12 - 13', '13 - 14', '14 - 15',
      '16 - 17', '17 - 18', '18 - 19', '19 - 20', '20 - 21'
    ];

    times.forEach((time, index) => {
      slots.push({
        id: `slot-${index}`,
        time,
        available: Math.random() > 0.3, // Random availability for demo
      });
    });

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedTime) {
      onSelectTime(selectedTime);
      onClose();
    }
  };

  // Generate days for the week view
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      days.push({
        id: i,
        dayName,
        dayNumber,
        monthName,
        isSelected: i === 2, // Wednesday selected by default
      });
    }
    
    return days;
  };

  const days = generateDays();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Appointment Time</Text>
          </View>

          <Text style={styles.subtitle}>
            Select an appointment time that works best for you.
          </Text>

          {/* Days Selection */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysContainer}
          >
            {days.map((day) => (
              <TouchableOpacity
                key={day.id}
                style={[
                  styles.dayItem,
                  day.isSelected && styles.selectedDayItem,
                ]}
              >
                <Text style={[
                  styles.dayName,
                  day.isSelected && styles.selectedDayText,
                ]}>
                  {day.dayName}
                </Text>
                <Text style={[
                  styles.dayNumber,
                  day.isSelected && styles.selectedDayText,
                ]}>
                  {day.monthName} {day.dayNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Slots Grid */}
          <View style={styles.timeSlotsContainer}>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    !slot.available && styles.unavailableSlot,
                    selectedTime === slot.time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  <Text style={[
                    styles.timeText,
                    !slot.available && styles.unavailableTimeText,
                    selectedTime === slot.time && styles.selectedTimeText,
                  ]}>
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {selectedTime && (
            <View style={styles.selectedTimeContainer}>
              <Text style={styles.selectedTimeLabel}>
                Wednesday, April 16 • {selectedTime}
              </Text>
            </View>
          )}

          {/* Book Now Button */}
          <TouchableOpacity
            style={[
              styles.bookButton,
              !selectedTime && styles.bookButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!selectedTime}
          >
            <Text style={[
              styles.bookButtonText,
              !selectedTime && styles.bookButtonTextDisabled,
            ]}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 20,
  },
  closeButton: {
    marginRight: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
    marginRight: 24, // Account for close button
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  daysContainer: {
    marginBottom: 30,
  },
  dayItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 70,
  },
  selectedDayItem: {
    backgroundColor: '#000000',
  },
  dayName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  timeSlotsContainer: {
    marginBottom: 30,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedTimeSlot: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  unavailableSlot: {
    backgroundColor: '#F3F4F6',
    opacity: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  unavailableTimeText: {
    color: '#9CA3AF',
  },
  selectedTimeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedTimeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  bookButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bookButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default TimeSlotModal;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppointmentState, Appointment, TimeSlot } from '../../types';

const initialState: AppointmentState = {
  appointments: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

// Generate mock time slots for the next 7 days
const generateTimeSlots = (employeeId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startDate = new Date();
  
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // Generate slots from 11:00 to 20:00 with 1-hour intervals
    for (let hour = 11; hour < 20; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      
      slots.push({
        id: `slot-${employeeId}-${dateStr}-${startTime}`,
        date: dateStr,
        startTime,
        endTime,
        isAvailable: Math.random() > 0.3, // 70% chance of being available
        employeeId,
      });
    }
  }
  
  return slots;
};

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointment/fetchAppointments',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const stored = await AsyncStorage.getItem(`appointments_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return rejectWithValue('Failed to fetch appointments');
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  'appointment/fetchAvailableSlots',
  async (employeeId: string, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return generateTimeSlots(employeeId);
    } catch (error) {
      return rejectWithValue('Failed to fetch available slots');
    }
  }
);

export const bookAppointment = createAsyncThunk(
  'appointment/bookAppointment',
  async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Store appointment locally
      const stored = await AsyncStorage.getItem(`appointments_${appointmentData.customerId}`);
      const appointments = stored ? JSON.parse(stored) : [];
      appointments.push(newAppointment);
      await AsyncStorage.setItem(`appointments_${appointmentData.customerId}`, JSON.stringify(appointments));
      
      return newAppointment;
    } catch (error) {
      return rejectWithValue('Failed to book appointment');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointment/cancelAppointment',
  async ({ appointmentId, userId }: { appointmentId: string; userId: string }, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const stored = await AsyncStorage.getItem(`appointments_${userId}`);
      if (stored) {
        const appointments: Appointment[] = JSON.parse(stored);
        const updatedAppointments = appointments.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
            : apt
        );
        await AsyncStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
      }
      
      return appointmentId;
    } catch (error) {
      return rejectWithValue('Failed to cancel appointment');
    }
  }
);

export const addServiceToAppointment = createAsyncThunk(
  'appointment/addServiceToAppointment',
  async (
    { appointmentId, service, userId }: { appointmentId: string; service: any; userId: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const stored = await AsyncStorage.getItem(`appointments_${userId}`);
      if (stored) {
        const appointments: Appointment[] = JSON.parse(stored);
        const updatedAppointments = appointments.map(apt => 
          apt.id === appointmentId 
              ? { 
                ...apt, 
                services: [...apt.services, service],
                totalAmount: apt.totalAmount + service.price,
                updatedAt: new Date().toISOString() 
              }
            : apt
        );
        await AsyncStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
        
        const updatedAppointment = updatedAppointments.find(apt => apt.id === appointmentId);
        return updatedAppointment;
      }
      
      throw new Error('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to add service to appointment');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBooking: (state, action: PayloadAction<Partial<Appointment>>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    updateCurrentBooking: (state, action: PayloadAction<Partial<Appointment>>) => {
      if (state.currentBooking) {
        state.currentBooking = { ...state.currentBooking, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Book appointment
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
        state.currentBooking = null;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Cancel appointment
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(apt => apt.id === action.payload);
        if (index !== -1) {
          state.appointments[index].status = 'cancelled';
          state.appointments[index].updatedAt = new Date().toISOString();
        }
      })
      // Add service to appointment
      .addCase(addServiceToAppointment.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.appointments.findIndex(apt => apt.id === action.payload!.id);
          if (index !== -1) {
            state.appointments[index] = action.payload;
          }
        }
      });
  },
});

export const { clearError, setCurrentBooking, clearCurrentBooking, updateCurrentBooking } = appointmentSlice.actions;
export default appointmentSlice.reducer;

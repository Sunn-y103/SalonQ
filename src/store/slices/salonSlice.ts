import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SalonState, Salon, Employee, Service } from '../../types';

const initialState: SalonState = {
  salons: [],
  currentSalon: null,
  isLoading: false,
  error: null,
};

// Mock data for development
const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'The Sharp Side',
    address: '1201 Peachtree St NE, Atlanta GA 30309',
    ownerId: 'owner1',
    openingTime: '09:00',
    closingTime: '22:00',
    photos: [],
    employees: [
      {
        id: 'emp1',
        name: 'Nate Black',
        mobileNumber: '+1234567890',
        salonId: '1',
        availability: [],
        createdAt: new Date().toISOString(),
      }
    ],
    services: [
      {
        id: 'service1',
        name: 'Hair Cutting',
        price: 25,
        duration: 30,
        salonId: '1',
      },
      {
        id: 'service2',
        name: 'Hair Spa',
        price: 40,
        duration: 60,
        salonId: '1',
      },
      {
        id: 'service3',
        name: 'Keratin Treatment',
        price: 80,
        duration: 120,
        salonId: '1',
      }
    ],
    createdAt: new Date().toISOString(),
  }
];

// Async thunks
export const fetchSalons = createAsyncThunk(
  'salon/fetchSalons',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockSalons;
    } catch (error) {
      return rejectWithValue('Failed to fetch salons');
    }
  }
);

export const fetchSalonById = createAsyncThunk(
  'salon/fetchSalonById',
  async (salonId: string, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      const salon = mockSalons.find(s => s.id === salonId);
      if (!salon) {
        throw new Error('Salon not found');
      }
      return salon;
    } catch (error) {
      return rejectWithValue('Failed to fetch salon details');
    }
  }
);

export const updateSalon = createAsyncThunk(
  'salon/updateSalon',
  async (salonData: Partial<Salon> & { id: string }, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return salonData;
    } catch (error) {
      return rejectWithValue('Failed to update salon');
    }
  }
);

export const addEmployee = createAsyncThunk(
  'salon/addEmployee',
  async (
    { salonId, employee }: { salonId: string; employee: Omit<Employee, 'id' | 'createdAt'> },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEmployee: Employee = {
        ...employee,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      return { salonId, employee: newEmployee };
    } catch (error) {
      return rejectWithValue('Failed to add employee');
    }
  }
);

export const removeEmployee = createAsyncThunk(
  'salon/removeEmployee',
  async (
    { salonId, employeeId }: { salonId: string; employeeId: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500));
      return { salonId, employeeId };
    } catch (error) {
      return rejectWithValue('Failed to remove employee');
    }
  }
);

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentSalon: (state, action: PayloadAction<Salon>) => {
      state.currentSalon = action.payload;
    },
    clearCurrentSalon: (state) => {
      state.currentSalon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch salons
      .addCase(fetchSalons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salons = action.payload;
      })
      .addCase(fetchSalons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch salon by ID
      .addCase(fetchSalonById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSalon = action.payload;
      })
      .addCase(fetchSalonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update salon
      .addCase(updateSalon.fulfilled, (state, action) => {
        const index = state.salons.findIndex(salon => salon.id === action.payload.id);
        if (index !== -1) {
          state.salons[index] = { ...state.salons[index], ...action.payload };
        }
        if (state.currentSalon && state.currentSalon.id === action.payload.id) {
          state.currentSalon = { ...state.currentSalon, ...action.payload };
        }
      })
      // Add employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        const { salonId, employee } = action.payload;
        const salonIndex = state.salons.findIndex(salon => salon.id === salonId);
        if (salonIndex !== -1) {
          state.salons[salonIndex].employees.push(employee);
        }
        if (state.currentSalon && state.currentSalon.id === salonId) {
          state.currentSalon.employees.push(employee);
        }
      })
      // Remove employee
      .addCase(removeEmployee.fulfilled, (state, action) => {
        const { salonId, employeeId } = action.payload;
        const salonIndex = state.salons.findIndex(salon => salon.id === salonId);
        if (salonIndex !== -1) {
          state.salons[salonIndex].employees = state.salons[salonIndex].employees.filter(
            emp => emp.id !== employeeId
          );
        }
        if (state.currentSalon && state.currentSalon.id === salonId) {
          state.currentSalon.employees = state.currentSalon.employees.filter(
            emp => emp.id !== employeeId
          );
        }
      });
  },
});

export const { clearError, setCurrentSalon, clearCurrentSalon } = salonSlice.actions;
export default salonSlice.reducer;

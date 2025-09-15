// User types
export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  gender?: 'male' | 'female' | 'other';
  userType: 'customer' | 'owner';
  isVerified: boolean;
  createdAt: string;
}

export interface Customer extends User {
  userType: 'customer';
  walletBalance: number;
  appointmentHistory: Appointment[];
}

export interface Owner extends User {
  userType: 'owner';
  salon: Salon;
}

// Salon types
export interface Salon {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  openingTime: string;
  closingTime: string;
  photos: string[];
  employees: Employee[];
  services: Service[];
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  mobileNumber: string;
  salonId: string;
  availability: TimeSlot[];
  createdAt: string;
}

// Service types
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description?: string;
  salonId: string;
}

// Booking types
export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  employeeId: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  salonId: string;
  employeeId: string;
  services: Service[];
  date: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: 'online' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  method: 'online' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

// Navigation types
export type RootStackParamList = {
  AuthStack: undefined;
  CustomerStack: undefined;
  OwnerStack: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CustomerRegister: undefined;
  OwnerRegister: undefined;
  OTPVerification: {
    mobileNumber: string;
    userType: 'customer' | 'owner';
    isRegistering: boolean;
  };
};

export type CustomerStackParamList = {
  CustomerTabs: undefined;
  BookingFlow: {
    salonId: string;
  };
  AppointmentDetails: {
    appointmentId: string;
  };
};

export type OwnerStackParamList = {
  OwnerTabs: undefined;
  EmployeeManagement: undefined;
  AddEmployee: undefined;
  SalonSettings: undefined;
};

export type CustomerTabsParamList = {
  Home: undefined;
  History: undefined;
  Favorites: undefined;
  Wallet: undefined;
  Profile: undefined;
};

export type OwnerTabsParamList = {
  Home: undefined;
  PaymentHistory: undefined;
  Profile: undefined;
};

// Store types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface SalonState {
  salons: Salon[];
  currentSalon: Salon | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppointmentState {
  appointments: Appointment[];
  currentBooking: Partial<Appointment> | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  salon: SalonState;
  appointment: AppointmentState;
}

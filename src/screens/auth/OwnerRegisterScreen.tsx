import React, { useState } from 'react';
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
import { AuthStackParamList } from '../../types';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'OwnerRegister'>;

interface StylistInfo {
  id: string;
  name: string;
  mobileNumber: string;
}

const OwnerRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    mobileNumber: '',
    salonName: '',
    address: '',
  });
  const [stylists, setStylists] = useState<StylistInfo[]>([{
    id: '1',
    name: '',
    mobileNumber: ''
  }]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.salonName.trim()) {
      newErrors.salonName = 'Salon name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Validate stylists
    stylists.forEach((stylist, index) => {
      if (!stylist.name.trim()) {
        newErrors[`stylist_${index}_name`] = 'Stylist name is required';
      }
      if (!stylist.mobileNumber.trim()) {
        newErrors[`stylist_${index}_mobile`] = 'Stylist mobile number is required';
      } else if (!/^[0-9]{10}$/.test(stylist.mobileNumber.replace(/\D/g, ''))) {
        newErrors[`stylist_${index}_mobile`] = 'Please enter a valid mobile number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatMobileNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    if (limited.length > 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    }
    return limited;
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateStylist = (index: number, field: 'name' | 'mobileNumber', value: string) => {
    const updatedStylists = [...stylists];
    updatedStylists[index] = { ...updatedStylists[index], [field]: value };
    setStylists(updatedStylists);
    
    const errorKey = `stylist_${index}_${field === 'mobileNumber' ? 'mobile' : 'name'}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addStylist = () => {
    setStylists([...stylists, {
      id: Date.now().toString(),
      name: '',
      mobileNumber: ''
    }]);
  };

  const removeStylist = (index: number) => {
    if (stylists.length > 1) {
      setStylists(stylists.filter((_, i) => i !== index));
    }
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', {
        mobileNumber: formData.mobileNumber,
        userType: 'owner',
        isRegistering: true,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Owner Registration"
        onBackPress={() => navigation.goBack()}
        backgroundColor={Colors.backgroundSecondary}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Register Your Salon</Text>
            <Text style={styles.subtitle}>
              Join SalonQ as a salon owner and manage your business
            </Text>
          </View>

          {/* Owner Information */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Owner Information</Text>
            
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.ownerName}
              onChangeText={(text) => updateFormData('ownerName', text)}
              error={errors.ownerName}
              autoCapitalize="words"
            />

            <Input
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChangeText={(text) => {
                const formatted = formatMobileNumber(text);
                updateFormData('mobileNumber', formatted);
              }}
              keyboardType="phone-pad"
              error={errors.mobileNumber}
              maxLength={14}
            />
          </View>

          {/* Salon Information */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Salon Information</Text>
            
            <Input
              label="Salon Name"
              placeholder="Enter salon name"
              value={formData.salonName}
              onChangeText={(text) => updateFormData('salonName', text)}
              error={errors.salonName}
              autoCapitalize="words"
            />

            <Input
              label="Address"
              placeholder="Enter salon address"
              value={formData.address}
              onChangeText={(text) => updateFormData('address', text)}
              error={errors.address}
              multiline
              numberOfLines={3}
              style={styles.addressInput}
            />
          </View>

          {/* Stylists Information */}
          <View style={styles.sectionContainer}>
            <View style={styles.stylistsHeader}>
              <Text style={styles.sectionTitle}>Stylists Information</Text>
              <TouchableOpacity onPress={addStylist} style={styles.addStylistButton}>
                <Icon name="add-circle" size={24} color={Colors.primary} />
                <Text style={styles.addStylistText}>Add Stylist</Text>
              </TouchableOpacity>
            </View>
            
            {stylists.map((stylist, index) => (
              <View key={stylist.id} style={styles.stylistContainer}>
                <View style={styles.stylistHeader}>
                  <Text style={styles.stylistTitle}>Stylist {index + 1}</Text>
                  {stylists.length > 1 && (
                    <TouchableOpacity 
                      onPress={() => removeStylist(index)}
                      style={styles.removeStylistButton}
                    >
                      <Icon name="close-circle" size={20} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
                
                <Input
                  label="Stylist Name"
                  placeholder="Enter stylist name"
                  value={stylist.name}
                  onChangeText={(text) => updateStylist(index, 'name', text)}
                  error={errors[`stylist_${index}_name`]}
                  autoCapitalize="words"
                />

                <Input
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  value={stylist.mobileNumber}
                  onChangeText={(text) => {
                    const formatted = formatMobileNumber(text);
                    updateStylist(index, 'mobileNumber', formatted);
                  }}
                  keyboardType="phone-pad"
                  error={errors[`stylist_${index}_mobile`]}
                  maxLength={14}
                />
              </View>
            ))}
          </View>

          <Button
            title="Register Salon"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  addressInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  stylistsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addStylistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addStylistText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 6,
  },
  stylistContainer: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  stylistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stylistTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  removeStylistButton: {
    padding: 4,
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default OwnerRegisterScreen;

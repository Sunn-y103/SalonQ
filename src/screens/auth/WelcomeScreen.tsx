import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import Button from '../../components/common/Button';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundSecondary} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>✂️</Text>
          </View>
          <Text style={styles.title}>Welcome to SalonQ</Text>
          <Text style={styles.subtitle}>
            Book appointments with your favorite salons or manage your salon business
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="I'm a Customer"
            onPress={() => navigation.navigate('CustomerRegister')}
            style={styles.primaryButton}
          />
          
          <Button
            title="I'm a Salon Owner"
            onPress={() => navigation.navigate('OwnerRegister')}
            variant="outline"
            style={styles.secondaryButton}
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              variant="outline"
              style={styles.loginButton}
              textStyle={styles.loginButtonText}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: Colors.borderLight,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    marginBottom: 32,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  loginButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;

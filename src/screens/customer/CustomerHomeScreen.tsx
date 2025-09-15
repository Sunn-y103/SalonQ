import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSalons } from '../../store/slices/salonSlice';
import { logoutUser } from '../../store/slices/authSlice';
import { CustomerStackParamList } from '../../types';
import Rating from '../../components/common/Rating';
import TimeSlotModal from '../../components/common/TimeSlotModal';
import LogoutModal from '../../components/common/LogoutModal';
import Colors from '../../constants/colors';

type NavigationProp = NativeStackNavigationProp<CustomerStackParamList>;

const CustomerHomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { salons, isLoading } = useAppSelector(state => state.salon);
  const { user } = useAppSelector(state => state.auth);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSalons());
  }, [dispatch]);

  const salon = salons[0]; // For demo, show first salon

  const handleTimeSelect = (time: string) => {
    console.log('Selected time:', time);
    // Handle the selected time
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logoutUser());
  };

  const handleEditProfile = () => {
    setShowHamburgerMenu(false);
    // Navigate to profile edit screen
    console.log('Edit profile clicked');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading salons...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundSecondary} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => setShowHamburgerMenu(true)}
          >
            <Icon name="menu" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>The Sharp Side</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="search" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {salon && (
            <View style={styles.content}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <View style={styles.profileImage}>
                    <Text style={styles.profileImageText}>NB</Text>
                  </View>
                  <Text style={styles.profileName}>Nate black</Text>
                  <View style={styles.locationContainer}>
                    <Icon name="location" size={14} color="#666" />
                    <Text style={styles.locationText}>Atlanta</Text>
                  </View>
                </View>
                
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="call" size={20} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="chatbubble" size={20} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Stats Section */}
              <View style={styles.statsSection}>
                <View style={styles.statItem}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.statText}>4.6/5</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="thumbs-up" size={16} color="#333" />
                  <Text style={styles.statText}>96%</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="people" size={16} color="#333" />
                  <Text style={styles.statText}>232</Text>
                  <Text style={styles.statLabel}>Appointments</Text>
                </View>
              </View>

              {/* Photo Gallery */}
              <View style={styles.photoGallerySection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Photo Gallery</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeMoreLink}>See more</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.photoGrid}>
                    {[1, 2, 3, 4].map((index) => (
                      <View key={index} style={styles.photoItem}>
                        <View style={styles.photoPlaceholder}>
                          <Icon name="person" size={24} color="#999" />
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Barber Shop Section */}
              <View style={styles.barberShopSection}>
                <Text style={styles.sectionTitle}>Barber shop</Text>
                <View style={styles.shopImagesContainer}>
                  <View style={styles.shopImageLarge}>
                    <Text style={styles.shopImageText}>Shop Interior</Text>
                  </View>
                  <View style={styles.shopImageSmall}>
                    <Text style={styles.shopImageText}>Tools</Text>
                  </View>
                </View>
                
                <View style={styles.shopInfo}>
                  <Text style={styles.shopInfoText}>
                    <Text style={styles.boldText}>Service:</Text> Mon to Sat • 9am to 10pm
                  </Text>
                  <Text style={styles.shopInfoText}>
                    <Text style={styles.boldText}>Address:</Text> 1201 Peachtree St NE, Atlanta GA 30309
                  </Text>
                  <TouchableOpacity style={styles.mapButton}>
                    <Text style={styles.mapButtonText}>Show on map</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Reviews Section */}
              <View style={styles.reviewsSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Reviews</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeMoreLink}>See all</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.reviewItem}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                      <Text style={styles.reviewerInitial}>D</Text>
                    </View>
                    <Text style={styles.reviewerName}>David</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    <Rating rating={5} size={14} showNumber={false} />
                    <Text style={styles.reviewRatingText}>5/5 • Excellent</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Book Now Button */}
        <View style={styles.bookButtonContainer}>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => setShowTimeModal(true)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Time Selection Modal */}
        <TimeSlotModal
          visible={showTimeModal}
          onClose={() => setShowTimeModal(false)}
          onSelectTime={handleTimeSelect}
        />

        {/* Hamburger Menu Modal */}
        <Modal
          visible={showHamburgerMenu}
          transparent
          animationType="slide"
          onRequestClose={() => setShowHamburgerMenu(false)}
        >
          <View style={styles.hamburgerOverlay}>
            <View style={styles.hamburgerMenu}>
              <View style={styles.hamburgerHeader}>
                <Text style={styles.hamburgerTitle}>Menu</Text>
                <TouchableOpacity onPress={() => setShowHamburgerMenu(false)}>
                  <Icon name="close" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.hamburgerMenuItem}
                onPress={handleEditProfile}
              >
                <Icon name="person-outline" size={20} color={Colors.textPrimary} />
                <Text style={styles.hamburgerMenuText}>Edit Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.hamburgerMenuItem}
                onPress={() => {
                  setShowHamburgerMenu(false);
                  setShowLogoutModal(true);
                }}
              >
                <Icon name="log-out-outline" size={20} color={Colors.primary} />
                <Text style={[styles.hamburgerMenuText, { color: Colors.primary }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Logout Confirmation Modal */}
        <LogoutModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  headerIcon: {
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
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImageText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  photoGallerySection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  seeMoreLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  photoItem: {
    width: 70,
    height: 70,
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barberShopSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  shopImagesContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
  },
  shopImageLarge: {
    flex: 2,
    height: 120,
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopImageSmall: {
    flex: 1,
    height: 120,
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopImageText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  shopInfo: {
    marginTop: 12,
  },
  shopInfoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
  },
  mapButton: {
    marginTop: 8,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  reviewsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  reviewRatingText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  bookButtonContainer: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  bookButton: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  hamburgerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  hamburgerMenu: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  hamburgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  hamburgerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  hamburgerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  hamburgerMenuText: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 15,
    fontWeight: '500',
  },
});

export default CustomerHomeScreen;

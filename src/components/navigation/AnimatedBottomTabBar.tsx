import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const INDICATOR_WIDTH = 60;



const AnimatedBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const TAB_WIDTH = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleValues = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;
  const translateYValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Animate indicator position
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 2,
      useNativeDriver: true,
      tension: 120,
      friction: 9,
    }).start();

    // Animate tab scales and positions with staggered timing
    scaleValues.forEach((scale, index) => {
      const isActive = index === state.index;
      const delay = Math.abs(index - state.index) * 50; // Stagger animation
      
      Animated.parallel([
        Animated.spring(scale, {
          toValue: isActive ? 1.1 : 1,
          useNativeDriver: true,
          tension: 120,
          friction: 9,
          delay: isActive ? 0 : delay,
        }),
        Animated.spring(translateYValues[index], {
          toValue: isActive ? -6 : 0,
          useNativeDriver: true,
          tension: 120,
          friction: 9,
          delay: isActive ? 0 : delay,
        }),
      ]).start();
    });
  }, [state.index]);

  const onPress = (index: number, key: string) => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <View style={styles.container}>
      {/* Floating Background Indicator */}
      <Animated.View
        style={[
          styles.floatingIndicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      
      {/* Tab Items */}
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isActive = index === state.index;
          
          // Map route names to icons
          const getTabIcon = (routeName: string) => {
            switch (routeName) {
              case 'Home':
                return require('../../assets/Home.png');
              case 'History':
                return require('../../assets/History.png');
              case 'Favorites':
                return require('../../assets/Favourites.png');
              case 'Wallet':
                return require('../../assets/Wallet.png');
              case 'Profile':
                return require('../../assets/Profile.png');
              default:
                return require('../../assets/Home.png');
            }
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => onPress(index, route.name)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [
                      { scale: scaleValues[index] },
                      { translateY: translateYValues[index] },
                    ],
                  },
                ]}
              >
                <Image
                  source={getTabIcon(route.name)}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor: isActive ? Colors.white : Colors.textSecondary,
                    },
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingBottom: 40,
    paddingTop: 25,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  floatingIndicator: {
    position: 'absolute',
    top: 18,
    width: INDICATOR_WIDTH,
    height: 50,
    backgroundColor: Colors.black,
    borderRadius: 25,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    height: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    width: '100%',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

export default AnimatedBottomTabBar;

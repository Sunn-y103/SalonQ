import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  backgroundColor = Colors.background,
  textColor = Colors.textPrimary,
  statusBarStyle = 'dark-content',
}) => {
  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      <SafeAreaView style={{ backgroundColor }}>
        <View style={[styles.container, { backgroundColor }]}>
          <View style={styles.leftContainer}>
            {showBackButton && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={onBackPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name="arrow-back" size={24} color={textColor} />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.centerContainer}>
            {title && (
              <Text style={[styles.title, { color: textColor }]}>
                {title}
              </Text>
            )}
          </View>
          
          <View style={styles.rightContainer}>
            {rightComponent}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftContainer: {
    width: 40,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;

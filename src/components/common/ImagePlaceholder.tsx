import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ImagePlaceholderProps {
  width: number;
  height: number;
  text?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width,
  height,
  text,
  icon,
  backgroundColor = '#F0F0F0',
  textColor = '#666',
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor,
        },
        style,
      ]}
    >
      {icon ? (
        <Icon name={icon} size={Math.min(width, height) * 0.3} color={textColor} />
      ) : text ? (
        <Text style={[styles.text, { color: textColor, fontSize: Math.min(width, height) * 0.2 }]}>
          {text}
        </Text>
      ) : (
        <Icon name="image-outline" size={Math.min(width, height) * 0.3} color={textColor} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  text: {
    fontWeight: '600',
  },
});

export default ImagePlaceholder;

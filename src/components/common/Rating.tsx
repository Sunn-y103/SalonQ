import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
  style?: any;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showNumber = true,
  style,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < maxRating; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} name="star" size={size} color="#FFD700" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon key={i} name="star-half" size={size} color="#FFD700" />
        );
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={size} color="#E5E7EB" />
        );
      }
    }

    return stars;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      {showNumber && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)}/5
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default Rating;

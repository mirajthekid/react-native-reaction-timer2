import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface BubbleProps {
  onPress: () => void;
  position?: { top: number; left: number };
}

const Bubble: React.FC<BubbleProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.bubble}
      onPress={onPress}
      activeOpacity={0.7}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1ec31e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Bubble;
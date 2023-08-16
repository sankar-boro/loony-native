import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const Label = ({text}: any) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: '#2d2d2d',
    fontSize: 14,
  },
});

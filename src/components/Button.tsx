import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';

export const Button = ({onTouchEnd}: any) => {
  return (
    <View onTouchEnd={onTouchEnd} style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: '#2d2d2d',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

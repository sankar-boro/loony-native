import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';

export const Button = ({onTouchEnd, text}: any) => {
  return (
    <View onTouchEnd={onTouchEnd} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: '#ededed',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

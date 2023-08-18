import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

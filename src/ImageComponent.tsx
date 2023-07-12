import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export default function ImageComponent(): JSX.Element {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet' // this one is Important
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  }, []);

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
    </>
  );
}


const styles = StyleSheet.create({
  box: {
      padding: 50,
      backgroundColor: "red"
  },
});
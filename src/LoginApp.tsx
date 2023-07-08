import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from 'react-native';
import { useServiceContext } from "./ServiceProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginApp({navigation, route}: any): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
      height: 40,
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#cccccc",
      borderRadius: 5,
      backgroundColor: "white",
      padding: 10
    },
    card: {
      width: "48%", 
      height: 50, 
      borderWidth: 1, 
      borderColor: "#ebe8e8", 
      marginTop: 10, 
      borderRadius: 5, 
      padding: 5, 
      backgroundColor: "white", 
      justifyContent: "center",
      alignItems: "center"
    }
});
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function ViewPasswords(): JSX.Element {
    const [url, setUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const save = async () => {
      await AsyncStorage.setItem(
        `key::url:${url}`,
        JSON.stringify({ username, password, url }),
      );
    }

    return (
      <View>
        <TextInput onChangeText={setUrl} value={url} placeholderTextColor="#cccccc" style={styles.input} placeholder='Url' />
        <TextInput onChangeText={setUsername} value={username} placeholderTextColor="#cccccc" style={styles.input} placeholder='Username' />
        <TextInput onChangeText={setPassword} value={password} placeholderTextColor="#cccccc" style={styles.input} placeholder='Password'/>
        <Button
          onPress={save}
          title=""
          color="#841584"
          accessibilityLabel="Save"
        />
      </View>
    );
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor: "#cccccc",
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
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fuse from 'fuse.js'

const Stack = createNativeStackNavigator();

export default function PasswordComponent(): JSX.Element {

    const [uniqueName, setUniqueName] = useState("");
    const [searchText, setSearch] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [searchRes, setSearchRes] = useState("");

    useEffect(() => {
      const list = [
        {
          "uniqueName": "gmail",
          "url": "https://gmail.com",
          "username": "s4nk4r.b0r0@gmail.com",
          "password": ["sankar"]
        },
        {
          "uniqueName": "gmail",
          "url": "https://gmail.com",
          "username": "s4nk4r.dd@gmail.com",
          "password": ["sankar"]
        }
      ]
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['uniqueName', 'url']
      }
      
      const fuse = new Fuse(list, options)
      
      const result = fuse.search('gmail')
      setSearchRes(JSON.stringify(result));
    }, []);

    const save = async () => {
      if (!uniqueName || !username || !password) {
        setError("Cannot have empty field values for username, password or url.");
      } else {
        await AsyncStorage.setItem(
          `${uniqueName}`,
          JSON.stringify({ username, password, uniqueName }),
        );
      }
    }

    const search = async () => {
      if (!searchText) {
        setError("Search field cannot be empty!");
      } else {
        AsyncStorage.getItem(searchText)
        .then((res: any) => {

        });
      }
    }

    return (
      <View>
        <Text>{searchRes}</Text>
        <View>
          <TextInput onChangeText={setSearch} value={searchText} placeholderTextColor="#cccccc" style={styles.input} placeholder='Search and edit' />
          <Button
            onPress={search}
            title="Search"
            color="#841584"
            accessibilityLabel="Search"
          />
        </View>

        <Text>{error}</Text>
        <TextInput onChangeText={setUniqueName} value={uniqueName} placeholderTextColor="#cccccc" style={styles.input} placeholder='Unique name' />
        <TextInput onChangeText={setUsername} value={username} placeholderTextColor="#cccccc" style={styles.input} placeholder='Username' />
        <TextInput onChangeText={setPassword} value={password} placeholderTextColor="#cccccc" style={styles.input} placeholder='Password'/>
        <Button
          onPress={save}
          title="Save"
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
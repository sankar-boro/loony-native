import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useServiceContext } from "./ServiceProvider";

const Stack = createNativeStackNavigator();

export default function PasswordComponent(): JSX.Element {
    const { dispatch, fuse } = useServiceContext();
    const [searchText, setSearch] = useState("");
    const [uniqueName, setUniqueName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [searchRes, setSearchRes] = useState([]);

    const save = () => {
      if (!uniqueName || !username || !password) {
        setError("Cannot have empty field values for username, password or url.");
      } else {
        // await AsyncStorage.setItem(
        //   `${uniqueName}`,
        //   JSON.stringify({ username, password, uniqueName }),
        // );
        fuse.add({ username, password, uniqueName })
      }
    }

    const search = () => {
      if (!searchText) {
        setError("Search field cannot be empty!");
      } else {
        const res = fuse.search(searchText)
        setSearchRes(res);
      }
    }

    return (
      <View>
        <View>{searchRes.map((res: any) => {
          return <Text key={res.uniqueName}>{res.item.uniqueName}{res.item.username}{res.item.password}</Text>
        })}</View>
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
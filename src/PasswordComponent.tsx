import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import { useServiceContext } from "./ServiceProvider";
import RNFS from "react-native-fs";

export default function PasswordComponent(): JSX.Element {
    const { data, fuse, dispatch } = useServiceContext();
    const [searchText, setSearch] = useState("");
    const [uniqueName, setUniqueName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<any>({inputValues: null, writeFile: null, searchText: null});
    const [searchRes, setSearchRes] = useState([]);

    const save = () => {
      if (!uniqueName || !username || !password) {
        setError({inputValues: "Cannot have empty field values for username, password or url.", writeFile: null, searchText: null });
      } else {
        let newData = { username, password, uniqueName };
        let newGroup: any = [...data, newData];
        fuse.add(newData)
        dispatch({
          keys: ['data'],
          values: newGroup
        })
        RNFS.writeFile(`${RNFS.ExternalDirectoryPath}/password.json`, JSON.stringify(newGroup))
        .then((readFileRes: any) => {  
            setUniqueName("");
            setUsername("");
            setPassword("");
        })
        .catch((err: any) => {
          setError({inputValues: null, writeFile: err, searchText: null });
        })
      }
    }

    const search = () => {
      if (!searchText) {
        setError({inputValues: null, writeFile: null, searchText: 'Search input cannot be empty!' });
      } else {
        const res = fuse.search(searchText)
        setSearchRes(res);
      }
    }

    return (
      <View>
        <View>
          <Text>{error.inputValues}</Text>
          <Text>{error.writeFile}</Text>
          <Text>{error.searchText}</Text>
        </View>

        <View>{searchRes.map((res: any, index: number) => {
          return <View key={index}>
            <Text>{res.item.uniqueName}</Text>
            <Text>{res.item.username}</Text>
            <Text>{res.item.password}</Text>
          </View>
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
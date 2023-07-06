import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from 'react-native';
import { useServiceContext } from "./ServiceProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GeneratePassword(): JSX.Element {
    const { data, fuse, dispatch } = useServiceContext();
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const save = () => {
        AsyncStorage.setItem("one_pass", password)
        .then((res: any) => {})
        .catch((err: any) => {
            setError(err);
        })
    }

    return (
      <View>
        {error ? <Text>{error}</Text> : null }
        <TextInput 
        onChangeText={setPassword} 
        value={password} 
        placeholderTextColor="#cccccc" 
        style={styles.input} placeholder='Create new password' 
        />
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
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
import { APP_PASSWORD } from "./types";
import { registerAppPassword } from "./Encrypt";

export default function GenerateOneTimePassword({navigation, route}: any): JSX.Element {
    
    const { dispatch, password } = useServiceContext();
    const [pass, setPassword] = useState("");
    const [error, setError] = useState<any>("");
    const [log, setLog] = useState("");

    useEffect(() => {
        // setLog(JSON.stringify(password))
    }, [password.hasPassword]);

    const save = () => {
        registerAppPassword(pass.trim())
        .then((res: any) => {
            if (res === 'SUCCESS') {
                dispatch({
                    keys: ['password'],
                    values: [{
                        load: true,
                        hasPassword: true,
                        auth: false
                    }]
                })
                navigation.navigate('Login', {name: ''})
            }
        })
        .catch((err: any) => {
            setError(JSON.stringify(err));
        })
    }

    const resetPassword = () => {
        AsyncStorage.removeItem(APP_PASSWORD)
        .then((res: any) => {
            dispatch({
                keys: ['password'],
                values: [{
                    load: false,
                    hasPassword: false,
                    auth: false
                }]
            })
        })
        .catch((err: any) => {
            setError(err);
        })
    }

    return (
      <View style={styles.container}>
        <View>
            <Text>Log</Text>
            <Text>{log}</Text>
        </View>
        {error ? <Text>{error}</Text> : null }
        <TextInput 
        onChangeText={setPassword} 
        value={pass} 
        placeholderTextColor="#cccccc" 
        style={styles.input} placeholder='Create new password' 
        />
        <Button
          onPress={save}
          title="Save"
          color="#841584"
          accessibilityLabel="Save"
        />
        <View style={{marginTop: 20}} />
        <Button
          onPress={resetPassword}
          title="Reset Password"
          color="#841584"
          accessibilityLabel="Reset Password"
        />
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
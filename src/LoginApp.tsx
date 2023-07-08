import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from 'react-native';
import { useServiceContext } from './ServiceProvider';
import { validatePassword } from "./Encrypt";

export default function LoginApp({navigation, route}: any): JSX.Element {
    const { password, dispatch } = useServiceContext();
    const [log, setLog] = useState<any>("");
    const [pass, setPass] = useState("");

    useEffect(() => {
      setLog(JSON.stringify(password));
      if (password.load && !password.hasPassword) {
        navigation.navigate('GenerateOneTimePassword', {name: ''})
      }
    }, [password.load, password.hasPassword]);

    const login = () => {
      validatePassword(pass)
      .then((res: any) => {
        dispatch({
          keys: ['password'],
          values: [{
              load: true,
              hasPassword: true,
              auth: true
          }]
        })
        navigation.navigate("Home", {name: ""})
      })
      .catch((err: any) => {
        setLog(JSON.stringify(err))
      });
    }

    return (
      <View style={styles.container}>
        <Text>{log}</Text>
        <TextInput 
          onChangeText={setPass} 
          value={pass} 
          placeholderTextColor="#cccccc" 
          style={styles.input} 
          placeholder='App Password' 
        />
        <Button
          onPress={login}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
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
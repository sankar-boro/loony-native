import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { useServiceContext } from './ServiceProvider';

export default function HomeScreen({navigation, route}: any): JSX.Element {
    
    const { password } = useServiceContext();
    const [log, setLog] = useState("");
    
    useEffect(() => {
      setLog(JSON.stringify(password));
      if (password.load && !password.hasPassword) {
        navigation.navigate('GeneratePassword', {name: 'Jane'})
      }
    }, [password.load])

    const renderCtxData = [
      {
        id: 1,
        title: "ADD PASSWORD",
        style: { color: "red", fontWeight: "bold" },
        navigate: () => navigation.navigate('PasswordComponent', {name: 'Jane'})
      },
      {
        id: 2,
        style: { color: "green", fontWeight: "bold" },
        title: "ENCRYPT IMAGE",
        navigate: () => navigation.navigate('ImageComponent', {name: 'Jane'})
      },
      {
        id: 3,
        style: { color: "blue", fontWeight: "bold" },
        title: "VIEW ALL",
        navigate: () => navigation.navigate('ShowAllComponent', {name: 'Jane'})
      },
      {
        id: 4,
        style: { color: "purple", fontWeight: "bold" },
        title: "UPDATE PASSWORD",
        navigate: () => navigation.navigate('GeneratePassword', {name: 'Jane'})
      }
    ];

    return (
      <View style={styles.container}>
        <View>
          <Text>Log</Text>
          <Text>{log}</Text>
        </View>
        <View style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {renderCtxData.map((data: any) => {
            return <View key={data.id} style={styles.card}>
            <Text style={{ ...data.style }} onPress={data.navigate}>{data.title}</Text>
          </View>
          })}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 10
    },
    card: {
      width: "100%", 
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
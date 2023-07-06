import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { useServiceContext } from "./ServiceProvider";

export default function ShowAllComponent(): JSX.Element {
    
    const { data, password } = useServiceContext();
    const [pass, setPass] = useState("");
    const [match, setMatch] = useState("FALSE");
    
    const matchPass = () => {
      if (pass === password.value) {
        setMatch("TRUE")
      }
    }

    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
        <TextInput 
        onChangeText={setPass} 
        value={pass} 
        placeholderTextColor="#cccccc" 
        style={styles.input} 
        placeholder='Enter App Password' 
        />
        <Button
          onPress={matchPass}
          title="Match"
          color="#841584"
          accessibilityLabel="Match"
        />
        </View>

        {match === "TRUE" && data && data.map((r: any) => {
            return <View key={r.uniqueName} style={styles.cardContainer}>
                <Text>{r.uniqueName}</Text>
                <Text>{r.username}</Text>
                <Text>{r.password}</Text>
            </View>
        })}
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    cardContainer: {
      backgroundColor: "white",
      padding: 10,
      marginBottom: 10
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 10,
      marginBottom: 10
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
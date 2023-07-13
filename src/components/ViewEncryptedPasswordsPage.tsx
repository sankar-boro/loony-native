import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { useServiceContext } from "../ServiceProvider";
import { decryptPassword, validatePassword } from "../Encrypt";

export default function ViewEncryptedPasswordsPage(): JSX.Element {
    
    const { data } = useServiceContext();
    const [pass, setPass] = useState("");
    const [match, setMatch] = useState("FALSE");
    const [thispass, setThisPass] = useState({id: "", value: ""});
    
    const matchPass = () => {
      validatePassword(pass)
      .then((res: any) => {
        setMatch("TRUE")
      })
      .catch((err: any) => {
      });
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

        {match === "TRUE" && data && (data.length > 0) ? data.map((r: any) => {
            return <View key={r.uniqueName} style={styles.cardContainer}>
                <Text>{r.uniqueName}</Text>
                <Text>{r.username}</Text>
                <View onTouchEnd={() => {
                  decryptPassword(JSON.parse(r.password))
                  .then((res: any) => {
                    setThisPass({id: r.uniqueName, value: res});
                  })
                  .catch((err) => {

                  })
                }}>
                  <Text>View Password</Text>{thispass.id === r.uniqueName ? <Text>{thispass.value}</Text> : null}
                </View>
            </View>
        }) : <View>
          <Text>No items</Text>  
        </View>}
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
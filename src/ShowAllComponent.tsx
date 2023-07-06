import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { useServiceContext } from "./ServiceProvider";

export default function ShowAllComponent(): JSX.Element {
    const { data, fuse, dispatch } = useServiceContext();

    return (
      <View>
        {data && data.map((r: any) => {
            return <View key={r.uniqueName}>
                <Text>{r.uniqueName}</Text>
                <Text>{r.username}</Text>
                <Text>{r.password}</Text>
            </View>
        })}
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
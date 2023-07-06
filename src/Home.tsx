import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen({navigation, route}: any): JSX.Element {
  
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
        title: "View All",
        navigate: () => navigation.navigate('ShowAllComponent', {name: 'Jane'})
      }
    ];
    return (
      <View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 10 }}>
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
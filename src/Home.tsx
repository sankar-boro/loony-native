import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNFS from "react-native-fs";

export default function HomeScreen({navigation, route}: any): JSX.Element {
    const [loony, setLoony] = useState<any>([]);
    const [writeData, setWriteData] = useState("");
  
    useEffect(() => {
      RNFS.readDir(RNFS.ExternalDirectoryPath)
      .then((readDirRes: any) => {
        if (readDirRes.length === 0) {
          RNFS.writeFile(`${RNFS.ExternalDirectoryPath}/password.json`, "[]")
          .then((writeRes: any) => {
  
          })
          .catch((err: any) => {
  
          })
        }
      })
    },[])
  
    const loadData = () => {
      RNFS.readFile(`${RNFS.ExternalDirectoryPath}/password.json`)
      .then((readFileRes: any) => {
        setLoony(JSON.parse(readFileRes));
      })
      .catch((err: any) => {
  
      })
    }
  
    const saveAllData = () => {
      RNFS.writeFile(`${RNFS.ExternalDirectoryPath}/password.json`, JSON.stringify(loony))
      .then((wres) => {
        setWriteData(JSON.stringify(wres));
      })
    }
  
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
      }
    ];
    return (
      <View>
        <View>
          {loony.map((ldata: any) => {
            return <View key={ldata.key}>
              <Text>
                NAME: {ldata.key} VALUE: {ldata.value}
              </Text>
            </View>
          })}
        </View>
  
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 10 }}>
          {renderCtxData.map((data: any) => {
            return <View key={data.id} style={styles.card}>
            <Text style={{ ...data.style }} onPress={data.navigate}>{data.title}</Text>
          </View>
          })}
        </View>
        <Button
          onPress={() => { 
            navigation.navigate('AddDataComponent', {name: 'Jane'})
          }}
          title="Add Component"
          color="#841584"
          accessibilityLabel="Add Component"
        />
        <Button
          onPress={saveAllData}
          title="Save All"
          color="#841584"
          accessibilityLabel="Save All"
        />
        <Button
          onPress={loadData}
          title="Load"
          color="#841584"
          accessibilityLabel="Load"
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
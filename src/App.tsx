import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNFS from "react-native-fs";

function App(): JSX.Element {
  const [loony, setLoony] = useState<any>([]);
  const [thiskey, setthiskey] = useState("");
  const [thisvalue, setthisvalue] = useState("");
  const [pathData, setPathData] = useState("");
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

  const appendData = () => {
    let x = loony;
    x.push({ key: thiskey, value: thisvalue })
    setLoony(x);
  }

  return (
    <View>
      <Text>Loony</Text>
      <View>
        <TextInput onChangeText={setthiskey} value={thiskey} placeholderTextColor="#cccccc" style={styles.input} placeholder='input key' />
        <TextInput onChangeText={setthisvalue} value={thisvalue} placeholderTextColor="#cccccc" style={styles.input} placeholder='input value'/>
      </View>

      <View>
        {loony.map((ldata: any) => {
          return <View key={ldata.key}>
            <Text>
              NAME: {ldata.key} VALUE: {ldata.value}
            </Text>
          </View>
        })}
      </View>
      <Button
        onPress={appendData}
        title="Append Data"
        color="#841584"
        accessibilityLabel="Append Data"
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
  }
});

export default App;

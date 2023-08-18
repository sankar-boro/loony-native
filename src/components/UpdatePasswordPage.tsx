/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import RNFS from 'react-native-fs';
import {RESULT, decryptPassword, encryptPassword} from '../Encrypt';
import {TextInput, Button} from 'react-native-paper';

export default function UpdatePasswordPage(navigation: any): JSX.Element {
  const {id, userName, uniqueName, password, url, keywords} =
    navigation.route.params;
  const {data, fuse, dispatch} = useServiceContext();
  const [newUniqueName, setUniqueName] = useState('');
  const [newUserName, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [newKeywords, setKeywords] = useState('');
  const [newUrl, setUrl] = useState('');
  const [error, setError] = useState<any>(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    decryptPassword(password).then((res: any) => {
      if (res.status === RESULT.SUCCESS) {
        setUniqueName(uniqueName);
        setUsername(userName);
        setPassword(res.data);
        setKeywords(keywords);
        setUrl(url);
      }
    });
  }, []);

  const updatePassword = () => {
    encryptPassword(newPassword).then((res: any) => {
      if (res.status === RESULT.SUCCESS) {
        let newData = {
          id,
          userName: newUserName,
          password: res.data,
          keywords: newKeywords.toLowerCase(),
          url: newUrl,
          uniqueName: newUniqueName,
        };
        const mapNewData: any = data.map((m: any) => {
          if (m.id === id) {
            return newData;
          }
          return m;
        });
        fuse.add(mapNewData);
        dispatch({
          keys: ['data'],
          values: [mapNewData],
        });
        RNFS.writeFile(
          `${RNFS.ExternalDirectoryPath}/password.json`,
          JSON.stringify(mapNewData),
        )
          .then(() => {
            setUniqueName('');
            setUsername('');
            setPassword('');
            setUrl('');
            setKeywords('');
          })
          .catch((err: any) => {
            setError({inputValues: null, writeFile: err, searchText: null});
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      {error ? (
        <View>
          <Text>{error.inputValues}</Text>
          <Text>{error.writeFile}</Text>
          <Text>{error.searchText}</Text>
        </View>
      ) : null}

      <TextInput
        mode="outlined"
        onChangeText={setUniqueName}
        value={newUniqueName}
        label="Organization name/Institution name"
      />
      <TextInput
        onChangeText={setUsername}
        value={newUserName}
        label="Username"
        mode="outlined"
      />
      <TextInput
        onChangeText={setPassword}
        value={newPassword}
        secureTextEntry={secureTextEntry}
        mode="outlined"
        label="Password"
        right={
          <TextInput.Icon
            icon="eye"
            color="#4287f5"
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          />
        }
      />
      <TextInput
        onChangeText={setKeywords}
        value={newKeywords}
        label="Keywords"
        mode="outlined"
      />
      <TextInput
        onChangeText={setUrl}
        value={newUrl}
        label="Url"
        mode="outlined"
      />
      <Button mode="contained" onPress={updatePassword} style={{marginTop: 10}}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  searchContainer: {
    width: '100%',
  },
  searchInput: {
    width: '75%',
    borderRadius: 50,
    paddingLeft: 15,
  },
  searchRes: {
    marginBottom: 20,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    borderColor: '#cccccc',
  },
  card: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ebe8e8',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '20%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
  },
  buttonTxt: {
    fontWeight: 'bold',
    color: 'white',
  },
  searchCard: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchCardText: {
    color: 'black',
  },
});

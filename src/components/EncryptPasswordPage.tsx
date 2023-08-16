import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import RNFS from 'react-native-fs';
import {encryptPassword} from '../Encrypt';
import {Button} from './Button';

export default function EncryptPasswordPage(): JSX.Element {
  const {data, fuse, dispatch} = useServiceContext();
  const [searchText, setSearch] = useState('');
  const [uniqueName, setUniqueName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);
  const [searchRes, setSearchRes] = useState([]);

  const savePassword = (res: any) => {
    let newData = [{username, password: res.data, uniqueName}];
    let newGroup: any = [...data, ...newData];
    fuse.add(newData);
    dispatch({
      keys: ['data'],
      values: [newGroup],
    });
    RNFS.writeFile(
      `${RNFS.ExternalDirectoryPath}/password.json`,
      JSON.stringify(newGroup),
    )
      .then(() => {
        setUniqueName('');
        setUsername('');
        setPassword('');
      })
      .catch((err: any) => {
        setError({inputValues: null, writeFile: err, searchText: null});
      });
  };

  const save = () => {
    if (!uniqueName || !username || !password) {
      setError({
        inputValues:
          'Cannot have empty field values for username, password or url.',
        writeFile: null,
        searchText: null,
      });
    } else {
      encryptPassword(password).then((res: any) => {
        if (res) {
          savePassword(res);
        }
      });
    }
  };

  const search = () => {
    if (!searchText) {
      setError({
        inputValues: null,
        writeFile: null,
        searchText: 'Search input cannot be empty!',
      });
    } else {
      const res = fuse.search(searchText);
      setSearchRes(res);
    }
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

      <View>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={setSearch}
            value={searchText}
            placeholderTextColor="#cccccc"
            style={{...styles.input, ...styles.searchInput}}
            placeholder="Search and edit"
          />
          <View style={styles.button} onTouchEnd={search}>
            <Text style={styles.buttonTxt}>Search</Text>
          </View>
        </View>

        <View>
          {searchRes.map((res: any, index: number) => {
            return (
              <View style={styles.searchCard} key={index}>
                <Text style={styles.searchCardText}>{res.item.uniqueName}</Text>
                <Text style={styles.searchCardText}>{res.item.username}</Text>
              </View>
            );
          })}
          {searchRes.length > 0 ? (
            <View
              onTouchEnd={() => {
                setSearchRes([]);
              }}>
              <Text>Close</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Text>Organization name/Institution name</Text>
      <TextInput
        onChangeText={setUniqueName}
        value={uniqueName}
        placeholderTextColor="#cccccc"
        style={styles.input}
        placeholder=""
      />
      <Text>Username</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholderTextColor="#cccccc"
        style={styles.input}
        placeholder=""
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#cccccc"
        style={styles.input}
        placeholder=""
        secureTextEntry={true}
      />
      <Button onTouchEnd={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    width: '75%',
    borderRadius: 50,
    paddingLeft: 15,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    padding: 10,
    borderWidth: 1,
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
  },
  searchCardText: {
    color: 'black',
  },
});

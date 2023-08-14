import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_PASSWORD} from '../types';
import {registerAppPassword} from '../Encrypt';
import RNFS from 'react-native-fs';
import {NAMES} from '../utils/Constants';

export default function CreateAppPasswordPage({navigation}: any): JSX.Element {
  const {dispatch} = useServiceContext();
  const [pass, setPassword] = useState('');
  const [error, setError] = useState<any>('');

  const save = () => {
    registerAppPassword(pass.trim())
      .then((res: any) => {
        if (res.status === 'SUCCESS') {
          RNFS.writeFile(
            `${RNFS.ExternalDirectoryPath}/password.json`,
            JSON.stringify([]),
          ).then(() => {
            dispatch({
              keys: ['password', 'data'],
              values: [
                {
                  load: true,
                  hasPassword: true,
                  auth: false,
                },
                [],
              ],
            });
            navigation.navigate(NAMES.LOGIN_PAGE, {name: ''});
          });
        }
      })
      .catch((err: any) => {
        setError(JSON.stringify(err));
      });
  };

  const resetPassword = () => {
    AsyncStorage.removeItem(APP_PASSWORD)
      .then(() => {
        dispatch({
          keys: ['password'],
          values: [
            {
              load: false,
              hasPassword: false,
              auth: false,
            },
          ],
        });
      })
      .catch((err: any) => {
        setError(err);
      });
  };

  return (
    <View style={styles.container}>
      {error ? <Text>{error}</Text> : null}
      <TextInput
        onChangeText={setPassword}
        value={pass}
        placeholderTextColor="#cccccc"
        style={styles.input}
        placeholder="Create new password"
      />
      <Button
        onPress={save}
        title="Save"
        color="#841584"
        accessibilityLabel="Save"
      />
      <View style={styles.margin} />
      <Button
        onPress={resetPassword}
        title="Reset Password"
        color="#841584"
        accessibilityLabel="Reset Password"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  margin: {marginTop: 5, marginBottom: 5},
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
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
});

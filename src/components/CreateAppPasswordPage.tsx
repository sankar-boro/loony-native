/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_PASSWORD} from '../types';
import {registerAppPassword} from '../Encrypt';
import RNFS from 'react-native-fs';
import {NAMES} from '../utils/Constants';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {RESULT} from '../v1/crypto';

export default function CreateAppPasswordPage({navigation}: any): JSX.Element {
  const {dispatch} = useServiceContext();
  const [pass, setPassword] = useState('');
  const [error, setError] = useState<any>('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [signupError, setSignupError] = useState('');

  const save = () => {
    if (!pass) {
      setSignupError('Password cannot be empty.');
    } else {
      registerAppPassword(pass.trim())
        .then((res: any) => {
          if (res.status === RESULT.SUCCESS) {
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
    }
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
        mode="outlined"
        onChangeText={(v: string) => {
          if (pass) {
            setSignupError('');
          }
          setPassword(v);
        }}
        value={pass}
        label="Create new password"
        secureTextEntry={secureTextEntry}
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
      {signupError ? (
        <HelperText type="error" visible={true}>
          {signupError}
        </HelperText>
      ) : null}
      <Button mode="contained" style={{marginTop: 10}} onPress={save}>
        Save
      </Button>
      <Button mode="contained" style={{marginTop: 10}} onPress={resetPassword}>
        Reset Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  margin: {marginTop: 5, marginBottom: 5},
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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

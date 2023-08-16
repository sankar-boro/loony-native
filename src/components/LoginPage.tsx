/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {validatePassword} from '../Encrypt';
import {NAMES} from '../utils/Constants';
import {Button} from './Button';

export default function LoginPage({navigation}: any): JSX.Element {
  const {password, dispatch} = useServiceContext();
  const [pass, setPass] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (password.load && !password.hasPassword) {
      navigation.navigate(NAMES.CREATE_APP_PASSWORD_PAGE, {name: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password.load, password.hasPassword]);

  const login = () => {
    validatePassword(pass)
      .then((_res: any) => {
        dispatch({
          keys: ['password'],
          values: [
            {
              load: true,
              hasPassword: true,
              auth: true,
            },
          ],
        });
      })
      .catch((_err: any) => {});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Password</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '80%'}}>
            <TextInput
              onChangeText={setPass}
              value={pass}
              placeholderTextColor="#cccccc"
              style={styles.input}
              placeholder="App Password"
              secureTextEntry={secureTextEntry}
            />
          </View>

          <View style={{width: '18%'}}>
            <Button
              onPress={() => {
                if (pass) {
                  setSecureTextEntry(!secureTextEntry);
                }
              }}
              title={secureTextEntry ? 'Show' : 'Hide'}
              color="#6d6d6d"
              accessibilityLabel="View"
            />
          </View>
        </View>
      </View>
      {/* <View onTouchEnd={login} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </View> */}
      <Button onTouchEnd={login} styles={styles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#2d2d2d',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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

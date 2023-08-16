/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {validatePassword} from '../Encrypt';
import {NAMES} from '../utils/Constants';
import {Button as AppButton} from './Button';

export default function LoginPage({navigation}: any): JSX.Element {
  const {password, dispatch} = useServiceContext();
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (password.load && !password.hasPassword) {
      navigation.navigate(NAMES.CREATE_APP_PASSWORD_PAGE, {name: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password.load, password.hasPassword]);

  const login = () => {
    if (pass) {
      setLoginError('');
      validatePassword(pass)
        .then((res: any) => {
          if (res.status === 'MATCH') {
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
          } else {
            setLoginError(res.data);
          }
        })
        .catch((err: any) => {
          setLoginError(err.data);
        });
    } else {
      setLoginError('Password cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {loginError ? (
          <View>
            <Text style={{color: 'red'}}>{loginError}</Text>
          </View>
        ) : null}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          <View style={{width: '85%'}}>
            <TextInput
              onChangeText={setPass}
              value={pass}
              placeholderTextColor="#cccccc"
              style={styles.input}
              placeholder="Master password"
              secureTextEntry={secureTextEntry}
            />
          </View>

          <View style={{width: '15%'}}>
            <Text
              onPress={() => {
                if (pass) {
                  setSecureTextEntry(!secureTextEntry);
                }
              }}>
              {secureTextEntry ? 'Show' : 'Hide'}
            </Text>
          </View>
        </View>
      </View>
      <AppButton onTouchEnd={login} styles={styles} text="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'white',
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
    fontSize: 15,
  },
  input: {
    height: 40,
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

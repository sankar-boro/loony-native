/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {validatePassword} from '../Encrypt';
import {NAMES} from '../utils/Constants';
import {TextInput, HelperText, Button} from 'react-native-paper';

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
      <View style={styles.containerCenter}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
          <Text>Login using Master Pasword or App Password</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <TextInput
            mode="outlined"
            onChangeText={(v: string) => {
              if (pass) {
                setLoginError('');
              }
              setPass(v);
            }}
            value={pass}
            label="Master password"
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
          {loginError ? (
            <HelperText type="error" visible={true}>
              {loginError}
            </HelperText>
          ) : null}
        </View>
        <Button mode="contained" onPress={login}>
          Login
        </Button>
        <View style={styles.forgot}>
          <Text>Forgot Password?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    backgroundColor: 'white',
  },
  containerCenter: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
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
  forgot: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row-reverse',
  },
});

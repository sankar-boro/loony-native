import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {validatePassword} from '../Encrypt';
import {NAMES} from '../utils/Constants';
// import {Button as AppButton} from './Button';
import {TextInput, HelperText, Button, Chip } from 'react-native-paper';

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
        <TextInput
          mode="outlined"
          onChangeText={setPass}
          value={pass}
          label="Master password"
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecureTextEntry(!secureTextEntry);
              }}
            />
          }
        />
        <HelperText type="error" visible={loginError ? true : false}>
          {loginError}
        </HelperText>
      </View>
      {/* <AppButton onTouchEnd={login} styles={styles} text="Login" /> */}
      <Button icon="camera" mode="contained" onPress={login}>
        Login
      </Button>
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
});

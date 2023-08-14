import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {validatePassword} from '../Encrypt';
import {NAMES} from '../utils/Constants';

export default function LoginPage({navigation}: any): JSX.Element {
  const {password, dispatch} = useServiceContext();
  const [pass, setPass] = useState('');

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
      <TextInput
        onChangeText={setPass}
        value={pass}
        placeholderTextColor="#cccccc"
        style={styles.input}
        placeholder="App Password"
        secureTextEntry={true}
      />
      <Button
        onPress={login}
        title="Login"
        color="#841584"
        accessibilityLabel="Login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

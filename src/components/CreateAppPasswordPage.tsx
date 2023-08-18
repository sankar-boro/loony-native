/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {registerAppPassword} from '../Encrypt';
import RNFS from 'react-native-fs';
import {NAMES} from '../utils/Constants';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {RESULT} from '../v1/crypto';

export default function CreateAppPasswordPage({navigation}: any): JSX.Element {
  const {dispatch} = useServiceContext();
  const [pass, setPassword] = useState('');
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
          setSignupError(JSON.stringify(err));
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCenter}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Master Password</Text>
          <Text>Master password or App lock password</Text>
        </View>
        <TextInput
          mode="outlined"
          onChangeText={(v: string) => {
            if (pass) {
              setSignupError('');
            }
            setPassword(v);
          }}
          value={pass}
          label="Create master password"
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  containerCenter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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

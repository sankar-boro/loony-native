/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {decryptPassword, validatePassword} from '../Encrypt';
import {RESULT} from '../v1/crypto';
import {TextInput, Button, HelperText} from 'react-native-paper';

export default function ViewEncryptedPasswordsPage(): JSX.Element {
  const {data} = useServiceContext();
  const [pass, setPass] = useState('');
  const [viewState, setViewState] = useState('LOGIN');
  const [thispass, setThisPass] = useState({id: '', value: ''});
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginError, setLoginError] = useState('');

  const verifyPassword = () => {
    if (!pass) {
      setLoginError('Password cannot be empty.');
    } else {
      validatePassword(pass)
        .then((res: any) => {
          if (res.status === RESULT.MATCH && data && data.length > 0) {
            setViewState('CONTAINS_DATA');
          }
          if (res.status === RESULT.MATCH && data && data.length === 0) {
            setViewState('NO_DATA');
          }
          if (res.status === RESULT.NOT_MATCH) {
            setViewState('LOGIN_FAILED');
            setLoginError(res.data);
          }
        })
        .catch((err: any) => {
          setLoginError(err.data);
        });
    }
  };

  return (
    <View>
      {viewState === 'LOGIN_FAILED' ? (
        <View style={{...styles.centerContainer, alignItems: 'center'}}>
          <Text>{loginError}</Text>
        </View>
      ) : null}
      {viewState === 'CONTAINS_DATA' ? (
        <View style={styles.container}>
          <View>
            {data.map((r: any) => {
              return (
                <View key={r.uniqueName} style={styles.cardContainer}>
                  <Text>{r.uniqueName}</Text>
                  <Text>{r.username}</Text>
                  <View>
                    <Text
                      onPress={() => {
                        decryptPassword(r.password)
                          .then((res: any) => {
                            if (res.status === RESULT.SUCCESS) {
                              setThisPass({id: r.uniqueName, value: res.data});
                            }
                          })
                          .catch(_err => {});
                      }}>
                      View Password
                    </Text>
                    {thispass.id === r.uniqueName ? (
                      <View>
                        <Text>{thispass.value}</Text>
                        <Text
                          onPress={() => {
                            setThisPass({id: '', value: ''});
                          }}>
                          Close
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
      {viewState === 'LOGIN' ? (
        <View style={styles.container}>
          <View style={styles.centerContainer}>
            <TextInput
              mode="outlined"
              onChangeText={(v: string) => {
                if (pass) {
                  setLoginError('');
                }
                setPass(v);
              }}
              value={pass}
              label="Enter Master password"
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
            <Button
              mode="contained"
              style={{marginTop: 10}}
              onPress={verifyPassword}>
              Verify Password
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  centerContainer: {display: 'flex', height: '100%', justifyContent: 'center'},
  input: {
    height: 40,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
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

import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {decryptPassword, validatePassword} from '../Encrypt';
import {RESULT} from '../v1/crypto';
import {Button} from './Button';

export default function ViewEncryptedPasswordsPage(): JSX.Element {
  const {data} = useServiceContext();
  const [pass, setPass] = useState('');
  const [match, setMatch] = useState('FALSE');
  const [thispass, setThisPass] = useState({id: '', value: ''});

  const verifyPassword = () => {
    validatePassword(pass)
      .then((res: any) => {
        if (res.status === RESULT.MATCH) {
          setMatch('TRUE');
        }
        if (res.status === RESULT.NOT_MATCH) {
          setMatch('FALSE');
        }
      })
      .catch((_err: any) => {});
  };

  return (
    <View style={styles.container}>
      {match === 'TRUE' && data && data.length > 0 ? (
        data.map((r: any) => {
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
        })
      ) : (
        <View>
          <TextInput
            onChangeText={setPass}
            value={pass}
            placeholderTextColor="#cccccc"
            style={styles.input}
            placeholder="Enter Master Password"
            secureTextEntry={true}
          />
          <Button
            onTouchEnd={verifyPassword}
            text="Verify Password"
            accessibilityLabel="Verify Password"
          />
        </View>
      )}
      {match === 'TRUE' && data && data.length === 0 ? (
        <View>
          <Text>No items</Text>
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

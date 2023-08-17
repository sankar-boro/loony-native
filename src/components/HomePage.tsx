/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useServiceContext} from '../ServiceProvider';
import {NAMES} from '../utils/Constants';
import {Card, Text as PaperText} from 'react-native-paper';

export default function HomePage({navigation}: any): JSX.Element {
  const {password} = useServiceContext();

  useEffect(() => {
    if (password.load && !password.hasPassword) {
      navigation.navigate(NAMES.CREATE_APP_PASSWORD_PAGE, {name: ''});
    }
  }, [password.load]);

  const renderCtxData = [
    {
      id: 1,
      title: 'ADD PASSWORD',
      body: 'Add new Institution/Organization/Company login info.',
      navigate: () =>
        navigation.navigate(NAMES.ENCRYPT_PASSWORD_PAGE, {name: ''}),
    },
    {
      id: 3,
      title: 'SAVED PASSWORDS',
      body: 'View saved Encrypted informations.',
      navigate: () =>
        navigation.navigate(NAMES.VIEW_ENCRYPTED_PASSWORDS_PAGE, {name: ''}),
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {renderCtxData.map((data: any) => {
          return (
            <Card
              key={data.id}
              style={{marginBottom: 15, width: '100%'}}
              onTouchEnd={data.navigate}>
              <Card.Content>
                <PaperText variant="titleLarge" style={{color: '#4287f5'}}>
                  {data.title}
                </PaperText>
                <PaperText variant="bodyMedium">{data.body}</PaperText>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  row: {
    fontWeight: 'bold',
    color: '#8d8d8d',
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ebe8e8',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
  },
});

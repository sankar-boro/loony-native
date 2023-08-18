import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/HomePage';
import EncryptPasswordPage from './components/EncryptPasswordPage';
import {AppContext, ServiceProvider} from './ServiceProvider';
import ViewEncryptedPasswordsPage from './components/ViewEncryptedPasswordsPage';
import AppPassword from './components/CreateAppPasswordPage';
import LoginPage from './components/LoginPage';
import UpdatePasswordPage from './components/UpdatePasswordPage';
import {NAMES} from './utils/Constants';
import {PaperProvider} from 'react-native-paper';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Loading} from './components/Loading';

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4287f5',
    secondary: '#153a75',
  },
};

function ViewContainer({password}: any): JSX.Element {
  if (password.load === false) {
    return <Loading />;
  }

  if (password.load === true) {
    if (password.hasPassword === false) {
      return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NAMES.CREATE_APP_PASSWORD_PAGE}
            component={AppPassword}
            options={{title: 'App Password'}}
          />
        </Stack.Navigator>
      );
    } else if (password.hasPassword === true && password.auth === false) {
      return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NAMES.LOGIN_PAGE}
            component={LoginPage}
            options={{title: 'Login'}}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NAMES.HOME_PAGE}
            component={HomeScreen}
            options={{title: 'Loony'}}
          />
          <Stack.Screen
            name={NAMES.ENCRYPT_PASSWORD_PAGE}
            component={EncryptPasswordPage}
            options={{title: 'Encrypt Password'}}
          />
          <Stack.Screen
            name={NAMES.VIEW_ENCRYPTED_PASSWORDS_PAGE}
            component={ViewEncryptedPasswordsPage}
            options={{title: 'View All Password', headerShown: true}}
          />
          <Stack.Screen
            name={NAMES.UPDATE_PASSWORDS_PAGE}
            component={UpdatePasswordPage}
            options={{title: 'Update Password', headerShown: true}}
          />
        </Stack.Navigator>
      );
    }
  }

  return (
    <View>
      <Text>Failed to load component</Text>
    </View>
  );
}

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <ServiceProvider>
          <AppContext.Consumer>
            {({password}) => {
              return <ViewContainer password={password} />;
            }}
          </AppContext.Consumer>
        </ServiceProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default Navigation;

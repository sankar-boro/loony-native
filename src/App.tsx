import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/HomePage';
import EncryptPasswordPage from './components/EncryptPasswordPage';
import {AppContext, ServiceProvider} from './ServiceProvider';
import ViewEncryptedPasswordsPage from './components/ViewEncryptedPasswordsPage';
import AppPassword from './components/CreateAppPasswordPage';
import LoginPage from './components/LoginPage';
import {NAMES} from './utils/Constants';
import {PaperProvider} from 'react-native-paper';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4287f5',
    secondary: '#153a75',
  },
};

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <ServiceProvider>
          <AppContext.Consumer>
            {({password}) => {
              if (password.auth === false) {
                return (
                  <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen
                      name={NAMES.LOGIN_PAGE}
                      component={LoginPage}
                      options={{title: 'Login'}}
                    />
                    <Stack.Screen
                      name={NAMES.CREATE_APP_PASSWORD_PAGE}
                      component={AppPassword}
                      options={{title: 'App Password'}}
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
                  </Stack.Navigator>
                );
              }
            }}
          </AppContext.Consumer>
        </ServiceProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default Navigation;

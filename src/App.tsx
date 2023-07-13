import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/HomePage';
import CameraPage from './components/CameraPage';
import EncryptPasswordPage from './components/EncryptPasswordPage';
import { AppContext, ServiceProvider } from './ServiceProvider';
import ViewEncryptedPasswordsPage from './components/ViewEncryptedPasswordsPage';
import AppPassword from './components/CreateAppPasswordPage';
import LoginPage from './components/LoginPage';
import PermissionsPage from './components/PermissionsPage';
import { MediaPage } from './components/MediaPage';
import { NAMES } from "./utils/Constants";

const Stack = createNativeStackNavigator();

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <ServiceProvider>
      <AppContext.Consumer>
        {({ password }) => {
          if (password.auth === false) {
            return <Stack.Navigator>
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
          } else {
            return <Stack.Navigator>
              <Stack.Screen
                name={NAMES.HOME_PAGE}
                component={HomeScreen}
                options={{title: 'Loony'}}
              />
              <Stack.Screen
                name={NAMES.MEDIA_PAGE}
                component={MediaPage}
                options={{title: 'Media'}}
              />
              <Stack.Screen
                name={NAMES.PERMISSIONS_PAGE}
                component={PermissionsPage}
                options={{title: 'Permissions'}}
              />
              <Stack.Screen 
                name={NAMES.ENCRYPT_PASSWORD_PAGE} 
                component={EncryptPasswordPage} 
                options={{title: 'Encrypt Password'}} 
              />
              <Stack.Screen 
                name={NAMES.CAMERA_PAGE} 
                component={CameraPage} 
                options={{title: 'Camera'}} 
              />
              <Stack.Screen 
                name={NAMES.VIEW_ENCRYPTED_PASSWORDS_PAGE}
                component={ViewEncryptedPasswordsPage} 
                options={{title: 'View All Password'}} 
              />
            </Stack.Navigator>
          }
        }}
      </AppContext.Consumer>
      </ServiceProvider>
    </NavigationContainer>
  );
}


export default Navigation;

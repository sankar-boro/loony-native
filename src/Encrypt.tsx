import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_PASSWORD} from './types';
import CryptoJS from 'react-native-crypto-js';

export enum RESULT {
  SUCCESS = 'SUCCESS',
  MATCH = 'MATCH',
  NOT_MATCH = 'NOT_MATCH',
  ERROR = 'ERROR',
}

export const encryptPassword = (userPassword: string) => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.getItem(APP_PASSWORD)
      .then(ciphertextstorage => {
        if (ciphertextstorage) {
          const ciphertext = CryptoJS.AES.encrypt(
            userPassword,
            ciphertextstorage,
          ).toString();
          resolve({status: RESULT.SUCCESS, data: ciphertext});
        }
      })
      .catch(err => {
        reject({status: RESULT.ERROR, data: err});
      });
  });
};

export const decryptPassword = (ciphertext: string) => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.getItem(APP_PASSWORD)
      .then(ciphertextstorage => {
        if (ciphertextstorage) {
          const bytes = CryptoJS.AES.decrypt(ciphertext, ciphertextstorage);
          resolve({
            status: RESULT.SUCCESS,
            data: bytes.toString(CryptoJS.enc.Utf8),
          });
        }
      })
      .catch(err => {
        reject({status: RESULT.ERROR, data: err});
      });
  });
};

export const registerAppPassword = (userPassword: string) => {
  return new Promise((resolve: any) => {
    let ciphertext = CryptoJS.AES.encrypt(
      userPassword,
      APP_PASSWORD,
    ).toString();
    AsyncStorage.setItem(APP_PASSWORD, ciphertext).then(() => {
      resolve({status: RESULT.SUCCESS, data: ciphertext});
    });
  });
};

export const validatePassword = (userPassword: string) => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.getItem(APP_PASSWORD)
      .then(ciphertextstorage => {
        if (ciphertextstorage) {
          const bytes = CryptoJS.AES.decrypt(ciphertextstorage, APP_PASSWORD);
          let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptedData !== userPassword) {
            resolve({status: RESULT.NOT_MATCH, data: 'Invalid password'});
          }
          if (decryptedData === userPassword) {
            resolve({status: RESULT.MATCH, data: ''});
          }
        }
      })
      .then(err => {
        reject({status: RESULT.ERROR, data: err});
      });
  });
};

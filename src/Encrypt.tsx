import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import { APP_PASSWORD } from "./types";

const saltRounds = 10;

export enum RESULT {
    SUCCESS = 1,
    MATCH = 2,
    NOT_MATCH = 3,
    ERROR = 4,
}

export const encryptWithAES = (text: any, appPass: string) => {
  return CryptoJS.AES.encrypt(text, appPass).toString();
};

export const decryptWithAES = (ciphertext: any, appPass: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, appPass);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const encryptAppPassword = (pass: string) => {
    return new Promise((resolve: any, reject: any) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                reject(RESULT.ERROR)
            } else {
                bcrypt.hash(pass, salt, function(err, hash) {
                    if (err) {
                        reject(RESULT.ERROR)
                    } else {
                        AsyncStorage.setItem(APP_PASSWORD, hash)
                        .then((res: any) => resolve(RESULT.SUCCESS))
                        .catch((err: any) => reject(RESULT.ERROR))
                    }
                });
            }
        });
    })
}

export const validatePassword = (pass: string) => {
    return new Promise((resolve: any, reject: any) => {
        AsyncStorage.getItem(APP_PASSWORD)
        .then((res: any) => {
            if (res) {
                bcrypt.compare(pass, res, function(err, result) {
                    if (err) {
                        reject(RESULT.ERROR)
                    } else if (result === true) {
                        resolve(RESULT.MATCH);
                    } else {
                        reject(RESULT.NOT_MATCH)
                    }
                });
            }
            reject(RESULT.ERROR)
        })
        .catch((err: any) => {

        })
        
    })
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import Aes from 'react-native-aes-crypto'
import { APP_PASSWORD } from "./types";

export enum RESULT {
    SUCCESS = "SUCCESS",
    MATCH = "MATCH",
    NOT_MATCH = "NOT_MATCH",
    ERROR = "ERROR",
}


const generateKey = (password: string, salt: string, cost: number, length: number) => Aes.pbkdf2(password, salt, cost, length)

const encryptData = (text: string, key: string) => {
    return Aes.randomKey(16).then(iv => {
        return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
            cipher,
            iv,
        }))
    })
}

const decryptData = (encryptedData: any, key: any) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')

export const encryptPassword = (password: string) => {
    return new Promise((resolve: any, reject: any) => {
        AsyncStorage.getItem(APP_PASSWORD)
        .then((res: any) => {
            if (res) {
                encryptData(password, res)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err);
                })
            } else {
                reject(RESULT.ERROR)
            }
        })
    })
}

export const decryptPassword = (enc_password: string) => {
    return new Promise((resolve: any, reject: any) => {
        AsyncStorage.getItem(APP_PASSWORD)
        .then((res: any) => {
            if (res) {
                decryptData(enc_password, res)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err);
                })
            } else {
                reject(RESULT.ERROR)
            }
        })
    })
}

export const registerAppPassword = (userPassword: string) => {
    return new Promise((resolve: any, reject: any) => {
        generateKey(userPassword, APP_PASSWORD, 5000, 256).then(key => {
            AsyncStorage.setItem(APP_PASSWORD, key)
            .then(() => {
              resolve("SUCCESS")  
            })
            .catch((err: any) => {
                reject(err);
            })
        })
        .catch((err: any) => {
            reject(err);
        })
    })
}

export const validatePassword = (userPassword: string) => {
    return new Promise((resolve: any, reject: any) => {
        generateKey(userPassword, APP_PASSWORD, 5000, 256).then(key => {
            AsyncStorage.getItem(APP_PASSWORD)
            .then((res: any) => {
                if (res === key) {
                    resolve("MATCH")
                } else {
                    reject("FAILED")
                }
            })
            .catch((err: any) => {
                reject(err)
            })
        })
    })
}
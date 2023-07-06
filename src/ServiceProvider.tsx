import React, { useContext, useEffect, useReducer } from "react";
import RNFS from "react-native-fs";
import Fuse from 'fuse.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setters = (state: any, action: any) => {
    const { keys, values } = action;
    if (keys && values && keys.length === values.length) {
        if (keys.length === values.length) {
            const updateData: any = {};
            keys.forEach((keyName: string, keyIndex: any) => {
                if (state.hasOwnProperty(keyName)) {
                    updateData[keyName] = values[keyIndex];
                }
            })
            return {
                ...state,
                ...updateData
            };
        }
    }
    return state;
}

const options = {
    includeScore: true,
    keys: ['uniqueName', 'url']
}

const initData: any = {
    data: [],
    fuse: new Fuse([], options),
    password: {
        load: false,
        hasPassword: false,
        auth: false,
        value: ''
    },
    dispatch: (e: any) => {
        console.log(e)
    }
}

export const AppContext = React.createContext<any>({
    data: [],
    fuse: new Fuse([], options),
    password: {
        load: false,
        hasPassword: false,
        auth: false,
        value: ''
    },
    dispatch: (e: any) => {
        console.log(e)
    }
});

const useApp = (dispatch: any) => {
    useEffect(() => {
        RNFS.readFile(`${RNFS.ExternalDirectoryPath}/password.json`)
        .then((readFileRes: any) => {
            let dj = JSON.parse(readFileRes);  
            dispatch({
                keys: ['data', 'fuse'],
                values: [dj, new Fuse(dj, options)]
            })
        })
      .catch((err: any) => {
  
      })
    }, []);
}

const usePassword = (dispatch: any) => {
    useEffect(() => {
        AsyncStorage.getItem("one_pass").then((res: any) => {
            if (res) {
                dispatch({
                    keys: ['password'],
                    values: [{
                        load: true,
                        hasPassword: true,
                        auth: false,
                        value: res,
                    }]
                })
            } else {
                dispatch({
                    keys: ['password'],
                    values: [{
                        load: true,
                        hasPassword: false,
                        auth: false,
                        value: "",
                    }]
                })
            }
        })
        .catch((err: any) => {
            dispatch({
                keys: ['password'],
                values: [{
                    load: true,
                    hasPassword: false,
                    auth: false,
                    value: ''
                }]
            })
        })
    }, []);
}

export const useServiceContext = () => useContext(AppContext);

export const ServiceProvider = (props: any) => {
    const [state, dispatch] = useReducer(setters, initData);
    useApp(dispatch);
    usePassword(dispatch);
    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

import React, { useContext, useEffect, useReducer } from "react";
import RNFS from "react-native-fs";
import Fuse from 'fuse.js'

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
    dispatch: (e: any) => {
        console.log(e)
    }
}

export const AppContext = React.createContext<any>({
    data: [],
    fuse: new Fuse([], options),
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

export const useServiceContext = () => useContext(AppContext);

export const ServiceProvider = (props: any) => {
    const [state, dispatch] = useReducer(setters, initData);
    useApp(dispatch);
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

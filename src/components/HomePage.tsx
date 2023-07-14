import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useServiceContext } from '../ServiceProvider';
import AndIcon from 'react-native-vector-icons/AntDesign';
import FontAIcon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';
import { NAMES } from "../utils/Constants";

export default function HomePage({navigation, route}: any): JSX.Element {
    
    const { password } = useServiceContext();
    const [log, setLog] = useState("");
    
    useEffect(() => {
      setLog(JSON.stringify(password));
      if (password.load && !password.hasPassword) {
        navigation.navigate(NAMES.CREATE_APP_PASSWORD_PAGE, {name: ''})
      }
    }, [password.load])

    const renderCtxData = [
      {
        id: 1,
        title: "ENCRYPT PASSWORD",
        iconName: <EntIcon name="lock" size={30} color="red" />,
        style: { color: "red", fontWeight: "bold" },
        navigate: () => navigation.navigate(NAMES.ENCRYPT_PASSWORD_PAGE, {name: ''})
      },
      {
        id: 2,
        style: { color: "green", fontWeight: "bold" },
        title: "ENCRYPT IMAGE",
        iconName: <FontAIcon name="photo" size={30} color="green" />,
        navigate: () => navigation.navigate(NAMES.CAMERA_PAGE, {name: ''})
      },
      {
        id: 3,
        style: { color: "blue", fontWeight: "bold" },
        title: "VIEW ENCRYPTED PASSWORDS",
        iconName: <AndIcon name="eye" size={30} color="blue" />,
        navigate: () => navigation.navigate(NAMES.VIEW_ENCRYPTED_PASSWORDS_PAGE, {name: ''})
      }
    ];

    return (
      <View style={styles.container}>
        {/* <View>
          <Text>Log</Text>
          <Text>{log}</Text>
        </View> */}
        <View style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {renderCtxData.map((data: any) => {
            return <View key={data.id} style={styles.card} onTouchEnd={data.navigate}>
              <View style={{ width: 50, marginLeft: 12 }}>{data.iconName}</View>
            <Text style={{ ...data.style }}>{data.title}</Text>
          </View>
          })}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 10
    },
    card: {
      width: "100%", 
      borderWidth: 1, 
      borderColor: "#ebe8e8", 
      marginTop: 10, 
      borderRadius: 5, 
      padding: 5, 
      backgroundColor: "white",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      height: 60
    }
  });
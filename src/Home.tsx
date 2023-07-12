import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useServiceContext } from './ServiceProvider';
import AndIcon from 'react-native-vector-icons/AntDesign';
import FontAIcon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';

export default function HomeScreen({navigation, route}: any): JSX.Element {
    
    const { password } = useServiceContext();
    const [log, setLog] = useState("");
    
    useEffect(() => {
      setLog(JSON.stringify(password));
      if (password.load && !password.hasPassword) {
        navigation.navigate('GenerateOneTimePassword', {name: ''})
      }
    }, [password.load])

    const renderCtxData = [
      {
        id: 1,
        title: "ADD PASSWORD",
        iconName: <EntIcon name="lock" size={30} color="red" />,
        style: { color: "red", fontWeight: "bold" },
        navigate: () => navigation.navigate('PasswordComponent', {name: ''})
      },
      {
        id: 2,
        style: { color: "green", fontWeight: "bold" },
        title: "ENCRYPT IMAGE",
        iconName: <FontAIcon name="photo" size={30} color="green" />,
        navigate: () => navigation.navigate('ImageComponent', {name: ''})
      },
      {
        id: 3,
        style: { color: "blue", fontWeight: "bold" },
        title: "VIEW ALL",
        iconName: <AndIcon name="eye" size={30} color="blue" />,
        navigate: () => navigation.navigate('ShowAllComponent', {name: ''})
      },
      {
        id: 4,
        style: { color: "purple", fontWeight: "bold" },
        title: "UPDATE PASSWORD",
        iconName: <EntIcon name="lock" size={30} color="purple" />,
        navigate: () => navigation.navigate('GenerateOneTimePassword', {name: ''})
      },
      {
        id: 5,
        style: { color: "purple", fontWeight: "bold" },
        title: "PERMISSIONS",
        iconName: <EntIcon name="lock" size={30} color="purple" />,
        navigate: () => navigation.navigate('PermissionsPage', {name: ''})
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
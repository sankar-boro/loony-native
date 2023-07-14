import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
    CameraPermissionStatus, useCameraDevices
} from 'react-native-vision-camera';
import { NAMES } from '../utils/Constants';
import { Camera } from 'react-native-vision-camera';

export default function CameraPage({ navigation }: any) {

    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>();
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>();

    const devices = useCameraDevices()
    const device = devices.back
    
    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermissionStatus);
        Camera.getMicrophonePermissionStatus().then(setMicrophonePermissionStatus);
      }, []);
    
      useEffect(() => {
        if (cameraPermissionStatus === 'denied' && microphonePermissionStatus === 'denied') navigation.replace(NAMES.PERMISSIONS_PAGE);
      }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

      
    if (device == null) return <View><Text>Loading</Text></View>
    if (!cameraPermissionStatus || !microphonePermissionStatus) return <View><Text>Loading...</Text></View>;
    
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    )
  }
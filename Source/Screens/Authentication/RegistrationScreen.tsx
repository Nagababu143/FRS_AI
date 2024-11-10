import { StyleSheet, Text, View ,SafeAreaView, Button, Alert} from 'react-native';
import React, { useRef } from 'react';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const RegistrationScreen = () => {
    const camera = useRef<Camera>(null);
    const device = useCameraDevice('front');
    const {hasPermission} = useCameraPermission();
    console.log(hasPermission);

    const registerFaceID = async () => {
        if(camera.current == null || !hasPermission){
            Alert.alert('Error', 'Camera is not ready or permission is not granted');
            return;
        }
        try {
            const photo = await camera.current.takePhoto({
              flash: 'off',
            });
            console.log('Photo taken: ', photo);
            Alert.alert('Success', 'Face ID registration photo captured!');
          } catch (error) {
            console.error('Error taking photo: ', error);
            Alert.alert('Error', 'Failed to take photo');
          }
    };
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Camera style={StyleSheet.absoluteFill} device={device} ref={camera} photo={true} isActive={true} />
        </View>
    <View>
      <Button onPress={registerFaceID} title="Register with FaceID" />
    </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
});
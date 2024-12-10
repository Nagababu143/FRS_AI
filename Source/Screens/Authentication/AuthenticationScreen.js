import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import FaceDetection from '@react-native-ml-kit/face-detection';

const AuthenticationScreen = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    async function requestPermission() {
      const permission = await camera.current?.requestCameraPermission();
      if (permission !== 'authorized') {
        Alert.alert('Camera Permission Denied', 'You need to grant camera permission to use this feature.');
      }
    }
    requestPermission();
  }, []);

  const capturePhotoForAuthentication = async () => {
    if (camera.current == null || !hasPermission) {
      Alert.alert('Error', 'Camera is not ready or permission is not granted');
      return;
    }
    try {
      const photo = await camera.current.takePhoto({});
      console.log('Photo taken:', photo);

      const faces = await FaceDetection.detect(photo.path, { landmarkMode: 'all' });
      console.log('Detected faces:', faces);

      if (faces.length > 0) {
        // Send photo and detected faces to the backend for authentication
        const response = await fetch('https://zelxbudq5h.execute-api.us-east-1.amazonaws.com/Dev/authentication', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            photoPath: photo.path,
            faces,
          }),
        });

        const responseData = await response.json();
        console.log('Backend response:', responseData);

        if (response.ok && responseData.authenticated) {
          Alert.alert('Success', 'Authentication successful! Welcome back.');
        } else {
          Alert.alert('Failed', 'Authentication failed. Face not recognized.');
        }
      } else {
        Alert.alert('No Face Detected', 'Please try again and ensure your face is clearly visible.');
      }
    } catch (error) {
      console.error('Error during authentication: ', error);
      Alert.alert('Error', 'Failed to authenticate');
    }
  };

  return (
    <View style={styles.container}>
      {showCamera && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.camButton}
          onPress={capturePhotoForAuthentication}
        >
          <Text>Authenticate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthenticationScreen;

import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import FaceDetection from '@react-native-ml-kit/face-detection';

const HomeScreen = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('front');
  const { hasPermission, requestPermission } = useCameraPermission();  // Use the permission hook
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    async function checkPermission() {
      if (!hasPermission) {
       // const permission = await requestPermission();
        const permission = await camera.current?.requestCameraPermission();
        if (permission !== 'authorized') {
          Alert.alert('Camera Permission Denied', 'You need to grant camera permission to use this feature.');
        }
      }
    }
    checkPermission();
  }, [hasPermission, requestPermission]);

  const fetchStoredData = async () => {
    try {
      const response = await fetch('https://zelxbudq5h.execute-api.us-east-1.amazonaws.com/Dev/FaceRecognition'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch stored data');
      }
      return await response.json(); // Array of stored face data
    } catch (error) {
      console.error('Error fetching stored data:', error);
      Alert.alert('Error', 'Failed to fetch stored data');
      return [];
    }
  };

  const matchFaces = (detectedFaces, storedFaces) => {
    if (!Array.isArray(detectedFaces) || !Array.isArray(storedFaces)) {
      console.error("Invalid input: detectedFaces or storedFaces is not an array.");
      return false;
    }
  
    return detectedFaces.some((detectedFace) =>
      storedFaces.some((storedFace) => {
        // Adjust matching logic based on your specific use case
        const isBoundingBoxSimilar =
          Math.abs(detectedFace.boundingBox.top - storedFace.boundingBox.top) < 0.1 &&
          Math.abs(detectedFace.boundingBox.left - storedFace.boundingBox.left) < 0.1;
        return isBoundingBoxSimilar;
      })
    );
  };
  

  const capturePhotoForAuthentication = async () => {
    if (camera.current == null || !hasPermission) {
      Alert.alert('Error', 'Camera is not ready or permission is not granted');
      return;
    }
    try {
      const photo = await camera.current.takePhoto({});
      console.log('Photo taken:', photo);

      const detectedFaces = await FaceDetection.detect(photo.path, { landmarkMode: 'all' });
      console.log('Detected faces:', detectedFaces);
  
      
      // if (detectedFaces.length === 0) {
      //   Alert.alert('No Face Detected', 'Please ensure your face is clearly visible.');
      //   return;
      // }

      const storedFaces = await fetchStoredData();

      const isMatched = matchFaces(detectedFaces, storedFaces);

      if (isMatched) {
        Alert.alert('Success', 'Authentication successful! Welcome back.');
      } else {
        Alert.alert('Failed', 'Authentication failed. Face not recognized.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
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

export default HomeScreen;

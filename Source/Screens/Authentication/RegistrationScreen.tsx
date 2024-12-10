import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Camera, useCameraDevice, useCameraPermission,useFrameProcessor } from 'react-native-vision-camera';
// import FaceDetection from '@react-native-ml-kit/face-detection';
// import { useFaceDetector } from 'react-native-vision-camera-face-detector';
import FaceDetection, {
  FaceDetectorLandmarkMode,
  FaceDetectorContourMode,
} from 'react-native-face-detection';
import { runOnJS } from 'react-native-reanimated';

const RegistrationScreen = () => {
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

//   const sensitivity = 0.8
// const frameProcessor = useFrameProcessor((frame) => {
//   'worklet'
//   // const faces = useFaceDetector(frame, { sensitivity: sensitivity })
//   // console.log("faces",faces)
//   // ...
// }, [sensitivity])
  // Define the frame processor for face detection
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const faces = faceDetector(frame); // Call the face detection API
  //   runOnJS(() => {
  //     // Handle detected faces on the JS thread
  //     if (faces.length > 0) {
  //       console.log('Faces detected:', faces);
  //     }
  //   });
  // }, []);
  const sensitivity = 0.8
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
//console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
   // const faces = detectFaces(frame, { sensitivity: sensitivity })
  }, [])

  const capturePhoto = async () => {
    if (camera.current == null || !hasPermission) {
      Alert.alert('Error', 'Camera is not ready or permission is not granted');
      return;
    }
    try {
      const photo = await camera.current.takePhoto({});
      console.log('Photo taken:', photo);
      // Detect faces in the photo
      const faces = await FaceDetection.processImage(photo.path, {
        landmarkMode: FaceDetectorLandmarkMode.ALL,
        contourMode: FaceDetectorContourMode.ALL,
      });

      if (faces.length > 0) {
        console.log('Faces detected:', faces);
        // Upload the photo and faces data to your backend
        const response = await fetch('https://zelxbudq5h.execute-api.us-east-1.amazonaws.com/Dev/FaceRecognition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            faces,
          }),
        });
            console.log(response)
        if (response.ok) {
          Alert.alert('Success', 'Faces uploaded successfully');
        } else {
          Alert.alert('Error', 'Failed to upload faces');
        }
      } else {
        Alert.alert('No Faces Detected', 'Please try again.');
      }
    } catch (error) {
      console.error('Error taking photo: ', error);
      Alert.alert('Error', 'Failed to take photo');
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
          frameProcessor={frameProcessor} // Pass frame processor for face detection
         frameProcessorFps={5} // Adjust FPS for performance
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.camButton}
          onPress={capturePhoto}
        >
          <Text>Capture Photo</Text>
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

export default RegistrationScreen;
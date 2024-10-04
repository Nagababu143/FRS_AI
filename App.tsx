import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./Source/Navigations/DrawerNavigation";
import { useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import SplashScreen from "react-native-splash-screen";
import { useEffect, useState } from "react";

const App = () => {
  const { hasPermission: cameraPermission, requestPermission: cameraPermissionRequest } = useCameraPermission();
  const { hasPermission: microphonePermission, requestPermission: microphonePermissionRequest } = useMicrophonePermission();
  
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      SplashScreen.hide();
      setIsSplashVisible(false);
    };

    hideSplashScreen();
  }, []);

  useEffect(() => {
    if (!isSplashVisible) {
      if (!cameraPermission) {
        cameraPermissionRequest();
      }
      if (!microphonePermission) {
        microphonePermissionRequest();
      }
    }
  }, [isSplashVisible, cameraPermission, microphonePermission]);

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}

export default App;

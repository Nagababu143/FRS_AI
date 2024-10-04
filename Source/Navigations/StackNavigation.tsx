import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions,useNavigation } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen'
import UserScreen from '../Screens/UserScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Entypo'
import LoginScreen from '../Screens/Authentication/LoginScreen';
import RegistrationScreen from '../Screens/Authentication/RegistrationScreen';


const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: '#0163d2',
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              color="#fff"
            />
          );
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="User"
        component={UserScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
            <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation;

const styles = StyleSheet.create({})
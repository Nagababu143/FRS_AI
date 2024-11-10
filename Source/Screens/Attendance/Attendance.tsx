import {Image, Text, TouchableOpacity , View} from 'react-native';
import React from 'react';
import { attendanceStyles } from './AttendanceScreenStyles';
import { navigate } from '../../Utils/Navigation';

const Attendance = () => {
  return (
    <View style={attendanceStyles.container}>
      <TouchableOpacity activeOpacity={0.7} style={attendanceStyles.serviceContainer} onPress={()=>navigate('StaffEnrollment')}>
        <Image style={attendanceStyles.serviceImage} source={require('../../Assets/Icons/face-scan.png')} />
        <Text style={attendanceStyles.serviceTitle}>Staff Entollment</Text>
      </TouchableOpacity>
  </View>
  );
};

export default Attendance;

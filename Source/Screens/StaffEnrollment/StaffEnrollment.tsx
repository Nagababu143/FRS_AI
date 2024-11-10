import {FlatList, Image, Text, TextInput, View } from 'react-native';
import React from 'react';
import { STAFF_MOCK_DATA } from '../../MockData/StaffMockData';
import { IStaff } from '../../Interfaces/IStaff';
import Icon from 'react-native-vector-icons/FontAwesome';
import { staffEnrollmentStyles } from './StaffEnrollmentStyles';

const StaffEnrollment = () => {

  const renderStaffDetails = (item:IStaff) => {
    return (
      <View style={staffEnrollmentStyles.staffDataCont}>
        <Image source={item.staffImage} style={staffEnrollmentStyles.staffImage} />
        <Text style={staffEnrollmentStyles.staffName}>{item.staffName}</Text>
      </View>
    );
  };

  const itemSeparator = () => {
    return (
      <View style={staffEnrollmentStyles.separatorLine} />
    );
  };
  return (
    <View style={staffEnrollmentStyles.container}>
      <View style={staffEnrollmentStyles.textInputCont}>
        <Icon name="search" size={25} />
        <TextInput style={staffEnrollmentStyles.textInput} />
      </View>
      <FlatList data={STAFF_MOCK_DATA} renderItem={({item})=> renderStaffDetails(item)} keyExtractor={(item)=>item.id} 
      ItemSeparatorComponent={() => itemSeparator()} />
    </View>
  );
};

export default StaffEnrollment;

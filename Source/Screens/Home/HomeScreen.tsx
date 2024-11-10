import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React from 'react';
import homeScreenStyles from './HomeScreenStyles';
import { FlatList } from 'react-native-gesture-handler';
import { HOME_SCREEN_MOCK_DATA } from '../../MockData/HomeScreenMockData';
import { IHomeService } from '../../Interfaces/IHomeService';
import { navigate } from '../../Utils/Navigation';

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const numColumns = width >= 768 ? 3 : 2;
    const itemWidth = (width - 40) / numColumns;

    const renderHomeServices = (item: IHomeService) => (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('Attendance')} style={[homeScreenStyles.serviceContainer, { width: itemWidth}]}>
            <Image style={homeScreenStyles.serviceImage} source={item.serviceIcon} />
            <Text style={homeScreenStyles.serviceTitle}>{item.serviceName}</Text>
            {item.serviceSubTitle && <Text style={homeScreenStyles.serviceSubTitle}>{item.serviceSubTitle}</Text>}
        </TouchableOpacity>
    );

    return (
        <View style={homeScreenStyles.container}>
            <FlatList
                key={`flatlist-numColumns-${numColumns}`}
                data={HOME_SCREEN_MOCK_DATA}
                renderItem={({ item }) => renderHomeServices(item)}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={homeScreenStyles.listContainer}
                scrollEnabled={true}
            />
        </View>
    );
};

export default HomeScreen;

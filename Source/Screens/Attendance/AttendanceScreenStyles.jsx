import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';

export const attendanceStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20,
        paddingTop:20,
    },
    serviceContainer: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        height: 150,
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:5,
        borderBottomWidth:5,
        borderBottomColor:Colors.dodgerBlue,
    },
    serviceImage: {
        height: 50,
        width: 50,
        marginBottom: 10,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        textAlign:'center',
    },
});

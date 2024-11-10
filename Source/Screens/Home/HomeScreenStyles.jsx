import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';

const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems:'center',
        height:'auto',
    },
    listContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    serviceContainer: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:5,
        borderBottomWidth:5,
        borderBottomColor:Colors.dodgerBlue,
        marginBottom:20,
        marginHorizontal:10,
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
    serviceSubTitle: {
        fontSize: 14,
        color: Colors.black,
    },
});

export default homeScreenStyles;

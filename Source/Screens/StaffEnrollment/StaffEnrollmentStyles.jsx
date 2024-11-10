import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';

export const staffEnrollmentStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        paddingHorizontal:20,
    },
    textInputCont:{
        borderWidth:1,
        borderColor:Colors.black,
        borderRadius:25,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginVertical:20,
    },
    textInput:{
        width:'90%',
        height:40,
    },
    staffCont:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    staffDataCont:{
        flexDirection:'row',
        alignItems:'center',
        gap:8,
    },
    staffImage:{
        height:40,
        width:40,
    },
    staffName:{
        fontSize:15,
        fontWeight:'400',
        color:Colors.black,
    },
    separatorLine: {
        height: 1,
        backgroundColor: 'red',
        marginVertical:10,
      },
});

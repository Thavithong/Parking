import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import colors from '../../themes/Colors'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    backImage: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#ebf9ee'
    },
    textInputStlye: {
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: colors.borderColor,
        borderWidth: 1,
        width: width - 90,
        height: 45,
        margin: 5,
    },
    groupInput: {
        // backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: colors.blue,
        borderBottomWidth: 1,
        // borderWidth: 1,
        width: width - 75,
        height: 45,
        margin: 5,
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.buttonColor,
        borderRadius: 30,
        borderColor: colors.buttonColor,
        borderWidth: 1,
        width: width - 200,
        height: 45,
        margin: 5,
        marginTop: 0,
        // shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 0.2,
        elevation: 3,
    },
    textButton: {
        color: colors.white,
        alignItems: 'center',
        textAlign: 'center'
    },
    checkInfo: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    contentLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 40
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        paddingBottom: 40
    },
    appName: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        color: colors.colorText
    },
    menuStyle:{
        // zIndex:999
        // marginTop: Platform.OS == 'android' ? 10 : 30
    }
})

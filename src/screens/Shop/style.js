import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    containHead: {
        backgroundColor: colors.buttonColor,
        height: 60,
        ...Platform.select({
            ios: {
                height: 80
            }
        }),
        borderBottomColor: colors.buttonColor,
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 0.2,
        elevation: 3,
    },
    head_text: {
        color: colors.white,
        fontSize: 18,
        ...Platform.select({
            ios: {
                marginTop: 20
            }
        }),
    },
    content: {
        // flex: 1,
        margin:5,
        padding:  10,
        paddingLeft: 10,
        paddingRight: 10
    },
    groupItem:{
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 0.2,
        elevation: 3,
        margin: 10
        // borderWidth:1
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
})

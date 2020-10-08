import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
        // paddingTop: 5,
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
        // borderBottomColor: colors.blue
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
    head_left_text: {
        color: '#fff',
        flex: 1,
        position: 'absolute',
        paddingLeft: -6,
        fontSize: 18
    },
    mainContent: {
        flex: 1,
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
    header: {
        backgroundColor: '#F4F4F4',
        height: 35,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 1,
    },
    title: {
        marginLeft: 15,
        fontSize: 18,
        // color: '#C9C9C9',
        // fontWeight:'bold'
    },
    groupInput: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    textInput: {
        flex: 1,
    }
})

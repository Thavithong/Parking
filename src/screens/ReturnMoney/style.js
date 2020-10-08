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
        borderBottomColor: colors.buttonColor,
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 0.2,
        elevation: 3,
    },
    headAnimate: {
        top: 0,
        height: 60,
        ...Platform.select({
            ios: {
                height: 80
            }
        }),
        backgroundColor: colors.white,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 0.8,
        },
        shadowOpacity: 0.9,
        shadowRadius: 0.2,
        elevation: 5,
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
        marginTop: 10,
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
    groupInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: colors.blue,
        borderBottomWidth: 1,
        width: width - 75,
        height: 45,
        margin: 5,
    },

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.7)'
    },
    modalContent: {
        borderRadius: 10,
        shadowColor: colors.general_orange,
        // alignItems: 'center',
        width: width - 50,
        height: 245,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 10,
        shadowRadius: 19.00,
        elevation: 24,
        margin: 10
    },
    btnButton: {
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headModal: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    confirm: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        flex: 1,
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        justifyContent: 'center'
    },
    textContent: {
        fontSize: 16,
        fontWeight: '200',
        margin: 5
    },
    btnGroup: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 20,
        paddingBottom: 15
    },
    btnText: {
        textAlign: 'center',
        color: 'white'
    },
    textDetail: {
        color: colors.blue,
        fontSize: 16,
        fontWeight: '300'
    },
    noDataFound: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '500',
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

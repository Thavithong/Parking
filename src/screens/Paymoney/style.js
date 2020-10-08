import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // paddingTop: 5,
        zIndex: -999
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
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        // borderColor: '#EBF0F6',
        borderColor: '#ccc',
        borderWidth: 3,
        width: width - 40,
        height: 45,
        margin: 5,
    },
    carNumber: {
        padding: 10,
        marginBottom: 10,
        width: 190,
        height: 85,
        borderColor: colors.black,
        borderWidth: 3,
        borderRadius: 7,
        backgroundColor: '#ffd800',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(128, 128, 128, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        // borderRadius: 10,
        shadowColor: colors.general_orange,
        // width: width - 50,
        // height: height - 50,
        width: '90%',
        height: '95%',
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 10,
        shadowRadius: 19.00,
        elevation: 24,
        // alignItems: 'center'
    },
    groupRow: {
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        padding: 5
    },
    headModal: {
        backgroundColor: colors.white,
        height: 50,
        ...Platform.select({
            ios: {
                height: 70
            }
        }),
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: colors.blue
    },
    textInputStyle: {
        fontSize: 20,
        fontWeight: '600'
    },
    titleInput: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        paddingTop: 30,
        flexDirection: 'column',
        zIndex: -999,
    },
    checkBox: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    inputVehicle: {
        borderRadius: 8, borderColor: '#ccc',
        marginLeft: 10,
        height: 45,
        borderWidth: 1,
        width: width - 50,
    },
    close: {
        marginLeft: 10,
        width: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleModal: {
        textAlign: 'center',
        flex: 1,
        marginLeft: -25,
        fontSize: 18,
        fontWeight: '500'
    },
    search: {
        height: 45,
        backgroundColor: colors.borderColor,
        borderRadius: 5
    },
    listStyle: {
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: colors.borderColor,
        flex: 1,
        justifyContent: 'center'
    },
    noDataFound: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '500',
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnExit: {
        backgroundColor: colors.white,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.white,
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 10,
        shadowRadius: 19.00,
        elevation: 24,
        bottom: 20
    },
    btnScanner: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 999,
        // borderRadius: 40,
        // shadowOffset: {
        //     width: 5,
        //     height: 5,
        // },
        // shadowOpacity: 0.9,
        // shadowRadius: 0.2,
        // elevation: 30,
    },


    //check-out style
    modalCheckOut: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.7)'
    },
    modalContentCheckOut: {
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
    headModalCheckOut: {
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
    contentCheckOut: {
        flex: 1,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        justifyContent: 'center'
    },
    textContentCheckOut: {
        fontSize: 16,
        fontWeight: '200',
        margin: 5
    },
    btnGroupCheckOut: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 20,
        paddingBottom: 15
    },
    btnButtonCheckOut: {
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: 'white'
    },

})

import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
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
        flex: 1,
    },
    group: {
        paddingTop: 10,
        flex: 1
    },
    groupRow: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.borderColor,
        height: 55
    },
    groupText: {
        padding: 10,
        marginLeft: 10,
        alignItems: 'center'
    },
    groupMainRow: {
        borderWidth: 1,
        borderColor: colors.borderColor
        // justifyContent: 'space-between',  
    },
    textInput: {
        // backgroundColor: 'gray',
        // borderRadius: 10,
        // borderWidth: 1,
        height: 45,
        marginLeft: 20,
        marginRight: 20
        // padding: 10, 
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
    printerText: {
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10
    },
    name: {
        flex: 1,
        textAlign: "left",
        marginLeft: 2,
        // marginRight: 10,
    },
    address: {
        flex: 1,
        textAlign: "right"
    },
    wtf: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 35
    },
    listStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 35,
        backgroundColor: colors.white
    }
})

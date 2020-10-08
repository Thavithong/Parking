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
    noDataFound: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '500',
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vihecleStyle: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vihecleImageStyle: {
        width: width / 2,
        height: 80,
        // flex:1,
        padding: 10,
        marginBottom: 5,
    },
    productNameStyle: {
        marginLeft: 5,
        fontSize: 16,
        // color: colors.buttonColor
    },
})

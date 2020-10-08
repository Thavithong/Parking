import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.white
    },
    containHead: {
        backgroundColor: colors.white,
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
        color: colors.buttonColor,
        fontSize: 20,
        ...Platform.select({
            ios: {
                marginTop: 20
            }
        }),
    },
    headerStyle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        width: '100%',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: colors.buttonColor,
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 3,
    },
    textInHeader: {
        fontSize: 18,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: '100%',
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 0.9
    },
    shareGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 15,
        paddingRight: 15,
        width: '100%'
    },
    textInput: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginRight: 10,
        height: 45,
        flex: 1,
        textAlign: 'center',
        borderColor: '#b3b3b3',
        borderWidth: 1,
        color: colors.black,
    },
    btnShare: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 50,
        height: 45,
        backgroundColor: colors.white,
        borderColor: '#b3b3b3',
        borderWidth: 1
    }

})

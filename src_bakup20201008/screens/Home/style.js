import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../themes/Colors'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 20
    },
    txtItem: {
        marginLeft: 8,
        fontSize: 14,
        // color:'white'
    },
    iconStyle: {
        height: 60,
        width: 60,
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    txtIcon: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: "center",
        fontSize: 50,
        fontWeight: 'bold'
    },

    //new style
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 50,
        // borderRadius: 8,
        backgroundColor: colors.buttonColor,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
        elevation: 3,  //ກຳນົກເປັນເງົາ
        overflow: 'visible',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -(100 / 2),
        width: width - 40,
        height: 100,
        borderRadius: 10,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    btnStyle: {
        // backgroundColor: colors.buttonColor,
        flex: 1,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 2
    },
    text: {
        flex: 1,
        width: width,
    },

    vihecleStyle: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    vihecleImageStyle: {
        width: width / 2,
        height: 80,
        // flex:1,
        padding: 10,
        marginBottom: 5,
    },
    productNameStyle: {
        // marginLeft: 5,
        fontSize: 16,
        textAlign:'center',
        marginTop: 5
        // color: colors.buttonColor
    },
    btnScanner: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        bottom: 20,
        right: 20,
        // borderWidth: 1,
        height: 60,
        width: 60,
        borderRadius: 30,
        // borderColor: colors.red,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 10,
        backgroundColor: colors.white
    },
    closeModal: {
        zIndex: 999,
        position: 'absolute',
        top: 20,
        left: 20,
        // backgroundColor:'red'
    },
    updateModal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor: 'rgba(26,26,26, 0.7)'
    },
    updateContent: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    updateTitle: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '500'
    },
    updateBtnGroup: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderTopWidth: Platform.OS == 'android' ? 1 : 2,
        borderColor: colors.borderColor
    },
    btnUpdateStyle: {
        height: 45,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextUpdate: {
        textAlign: 'center',
        color: colors.customNav
    }
})

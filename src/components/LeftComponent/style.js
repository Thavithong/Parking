import { StyleSheet, Platform } from 'react-native'
import Metrics from '../../themes/Metrices'
import Colors from '../../themes/Colors'

export default StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingTop: Platform.OS === 'ios' ? 20 : 20,
        marginTop: Platform.OS === 'ios' ? 20 : 28.9,
    },
    button: {
        justifyContent: 'center'
    }
})
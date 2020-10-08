import { StyleSheet, Platform } from 'react-native'
import Metrics from '../../themes/Metrices'
import Colors from '../../themes/Colors'

export default StyleSheet.create({
    containHead: {
        backgroundColor: Colors.orange,
        height: 60,
        ...Platform.select({
            ios: {
                height: 80
            }
        }),
        borderBottomColor: Colors.orange
    },
    head_text: {
        color: Colors.white,
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
    }
})
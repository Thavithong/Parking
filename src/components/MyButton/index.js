import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../themes/Colors'
const { width } = Dimensions.get('window')
class index extends Component {
    render() {
        const { isDisable } = this.props;
        return (
            !isDisable ?
                <TouchableOpacity style={[styles.loginButton,
                {
                    backgroundColor: this.props.myBackground != null ? this.props.myBackground : colors.buttonColor,
                    borderColor: this.props.myBackground != null ? this.props.myBackground : colors.buttonColor
                }]} onPress={this.props.onPress}>
                    <Text style={styles.textButton}>{this.props.textButton}</Text>
                </TouchableOpacity> :
                <View style={styles.loginButtonDisable}>
                    <Text style={styles.textButton}>{this.props.textButton}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
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
        zIndex: -999
    },
    loginButtonDisable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AEAEAE',
        borderRadius: 30,
        borderColor: '#AEAEAE',
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
        zIndex: -999
    },
    textButton: {
        color: colors.white,
        alignItems: 'center',
        textAlign: 'center'
    },
})

export default index;

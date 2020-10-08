import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import images from '../../themes/Image'

class CustomNavbar extends Component {
    renderLeft() {
        const { Nav, onBackLeft } = this.props
        return (
            <View style={[styles.leftContainer, this.props.rightTitle ? { flex: 1 } : null]}>
                {this.props.backButton
                    ? (
                        <TouchableOpacity onPress={() => onBackLeft ? onBackLeft() : Nav.goBack(null)} style={{ justifyContent: 'center', width: 50 }} >
                            <Ionicons name='ios-arrow-round-back-outline' size={40} color='white' />
                        </TouchableOpacity>
                    )
                    : (
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.props.onPressLeft()}>
                            <Ionicons name='ios-menu' size={30} color='white' />
                        </TouchableOpacity>
                    )
                }

            </View>
        )
    }

    renderRight() {
        return (
            <View style={[styles.rightContainer, this.props.rightTitle != "" ? { flex: 1 } : null]}>
                {this.props.rightTitle == "" ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Ionicons name='ios-notifications-outline' size={30} color='white' />
                        <Ionicons name='ios-people-outline' size={30} color='white' style={{ marginLeft: 10 }} />
                    </View>
                ) : <View />}
                {this.props.rightTitle == "logout" ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.props.onPressLogout()}>
                            {/* <Ionicons name='md-log-out' size={30} style={{ marginLeft: 15 }} color='white' /> */}
                            <Image source={images.iconClose} style={{ marginLeft: 15, width: 25, height: 25 }} />
                        </TouchableOpacity>
                    </View>
                ) : <View />}

            </View>
        )
    }

    renderMid() {
        let msg = this.props.txtTitle;
        return (
            <View style={[styles.midContainer, this.props.rightTitle ? { flex: 3 } : null]}>
                {msg ?
                    <View>
                        <Text numberOfLines={1} style={styles.txtTitleMiddle}>{msg}</Text>
                    </View>
                    : <Text>Hello</Text>
                }
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container]}>
                {this.renderLeft()}
                {this.renderMid()}
                {this.renderRight()}
            </View>
        );
    }
}


// Prop type warnings
const propTypes = {
    backButton: PropTypes.bool,
    // midTitle: PropTypes.bool,
    rightTitle: PropTypes.bool,
    onPressLeft: PropTypes.func,
    txtTitle: PropTypes.string,
    onPressLogout : PropTypes.func
}

const defaultProps = {
    // codeLength: 5

}

CustomNavbar.propTypes = propTypes
CustomNavbar.defaultProps = defaultProps

export default CustomNavbar;

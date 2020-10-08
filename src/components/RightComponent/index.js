import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import Colors from '../../themes/Colors'
// import IconBadge from 'react-native-icon-badge';

class RightComponent extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
                    <IconBadge
                        MainElement={
                            <Ionicons size={45} name={this.props.icons_name} color={Colors.white} />
                        }
                        BadgeElement={
                        <Text style={{ color: '#FFFFFF' }}>{this.props.count}</Text>
                        }
                        IconBadgeStyle={
                            {
                                marginLeft:12,
                                width: 25,
                                height: 25,
                                backgroundColor: Colors.red
                            }
                        }
                        Hidden={0}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

// Prop type warnings
const propTypes = {
    onPress: PropTypes.func,
    icons_name: PropTypes.string
}

// const defaultProps = {}

RightComponent.propTypes = propTypes
// RightComponent.defaultProps = defaultProps

export default connect(null, null)(RightComponent)
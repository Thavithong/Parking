import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles'
import Colors from '../../themes/Colors'

export default class ACIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ActivityIndicator
                size={this.props.size}
                color={this.props.color}
                type={'Circle'}
                style={styles.spinnerStyle} />
        );
    }
}

ACIndicator.defaultProps = {
    size: 'large',
    color: Colors.general_color
}

ACIndicator.propTypes = {

}

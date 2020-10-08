import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, Dimensions, Image } from 'react-native';
import colors from '../../themes/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './style';
export default class UnitelTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusState: false,
            value: null
        };
    }

    onFocus = () => {
        this.setState({ focusState: true })
    }

    onBlur = () => {
        this.setState({ focusState: false })
    }

    render() {
        return (
            <View>
                <View style={{ width: '100%', borderWidth: 1, borderColor: !this.state.focusState && this.props.value === null ? '#CBCBCB' : colors.buttonColor, borderRadius: 5, height: 45 }}>
                    {
                        this.state.focusState || this.props.value != null ?
                            <Text style={{
                                top: -13,
                                backgroundColor: 'white',
                                marginLeft: this.props.labelLeft,
                                position: 'absolute',
                                color: !this.state.focusState && this.props.value == null ? '#CBCBCB' : colors.buttonColor
                            }}>
                                {this.props.label}
                            </Text>
                            : null
                    }
                    {
                        this.props.inputTextIcon ?
                            <View style={styles.groupInput}>
                                {/* <Ionicons name={this.props.iconName}
                                    color={this.props.iconColor}
                                    size={35}
                                    style={styles.iconStyle} /> */}
                                <Image source={this.props.image_name} style={{ width: 30, height: 30, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }} />
                                <TextInput
                                    value={this.props.value}
                                    style={[this.props.style, { marginLeft: this.props.textLeft, flex: 1, }]}
                                    onFocus={() => this.onFocus()}
                                    onBlur={() => this.onBlur()}
                                    maxLength={this.props.maxLength}
                                    keyboardType={this.props.keyboardType}
                                    onChangeText={this.props.onChangeText}
                                    placeholder={this.state.focusState ? null : this.props.value != null ? null : this.props.label}
                                    secureTextEntry={this.props.secureTextEntry}
                                />
                            </View>
                            :
                            <TextInput
                                value={this.props.value}
                                style={[this.props.style, { marginLeft: this.props.textLeft, width: '100%', flex: 1, }]}
                                {...this.props}
                                onFocus={() => this.onFocus()}
                                onBlur={() => this.onBlur()}
                                maxLength={this.props.maxLength}
                                keyboardType={this.props.keyboardType}
                                onChangeText={this.props.onChangeText}
                                placeholder={this.state.focusState ? null : this.props.value != null ? null : this.props.label}
                                secureTextEntry={this.props.secureTextEntry}
                            />
                    }
                </View>
                <Text allowFontScaling={false} style={{
                    marginHorizontal: 15,
                    color: colors.red,
                    fontSize: 10,
                    marginTop: 4,
                    marginBottom: this.props.error ? 10 : 1,
                    left: -4
                }}>{this.props.error}</Text>
            </View>
        );
    }
}
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Mybutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPressButton =()=>{
        //do something in here 
    }

    render() {
        return (
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => this.onPressButton()}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems:'center'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
})

export default Mybutton;

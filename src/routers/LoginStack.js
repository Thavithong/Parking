import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import LoginScreen from '../screens/Login'
import TabHomeStack from './TabHomeStack'
import App from '../screens/App'
import RegisterScreen from '../screens/Register'

export default StackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
    },
    App: {
      screen: App
    },
    TabHomeStack: {
      screen: TabHomeStack
    }
  }, {
    navigationOptions: props => {
    },
    headerMode: 'none'
  })
  
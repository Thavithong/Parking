import React from 'react'
import { Dimensions } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import LoginStack from './LoginStack'
import DrawerContainer from '../components/DrawerContainer'
import TabHomeStack from './TabHomeStack'
const { width, height } = Dimensions.get('window')

const DrawerStack = DrawerNavigator({
  home: { screen: TabHomeStack }
}, {
  gesturesEnabled: false,
  drawerWidth: width - 80,
  contentComponent: (props) => <DrawerContainer {...props} />
})

export default StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerStack },

}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'drawerStack'
})

import React, { Component } from 'react'
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import Colors from '../themes/Colors'
import { Home, Paymoney, Report, ReturnMoney, Payment, Setting, Shop,Help, Vehicle, Share } from '../screens/'

const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerStyle: {
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0,
            },
        },
    },
    Paymoney: {
        screen: Paymoney,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Report: {
        screen: Report,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    ReturnMoney: {
        screen: ReturnMoney,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Setting: {
        screen: Setting,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Shop: {
        screen: Shop,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Help: {
        screen: Help,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Vehicle: {
        screen: Vehicle,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    },
    Share:{
        screen: Share,
        navigationOptions: {
            tabBarVisible: false,
            header: null,
        }
    }
}, { transitionConfig: getSlideFromRightTransition, }
)

export default TabNavigator({
    Home: {
        screen: HomeStack, navigationOptions: () => ({
            title: 'Home',
            tabBarLabel: 'Home'
        })
    },
},
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                switch (routeName) {
                    case 'Home':
                        iconName = `ios-home${focused ? '' : '-outline'}`
                        break
                }
                return <Ionicons name={iconName} color={tintColor} size={32} />
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: Colors.activate,
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }

)
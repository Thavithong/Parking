import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')

const metrics = {
    width,
    height,
    baseMargin: 10,
    smallMargin: 5,
    baseHeight: 45,
    baseWidth: 100,
    baseRaduis: 10,
    basefontSize: 14,
    meduimfontSize: 16,
    customNavBarHeight: 52, 
    doubleBaseMargin: 20,
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    navBarHeight: (Platform.OS === 'ios') ? 72 : 64,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 60
    },
    images: {
        small: 20,
        xSmall: 25,
        xXSmall: 30,
        medium: 40,
        xMedium: 60,
        large: 70,
        avatar: 80,
        mediumLogo: 150,
        logo: 200
    },
}

export default metrics
import { StyleSheet, Platform } from 'react-native'
import colors from '../../themes/Colors'
export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.buttonColor,
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    borderBottomColor: colors.buttonColor,
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 0.2,
    elevation: 5,
  },
  leftContainer: {
    marginLeft: 10,
    width: 20,
    justifyContent: 'center'
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  avatarNav: {
    height: (Platform.OS === 'ios') ? 72 : 64,
    width: (Platform.OS === 'ios') ? 72 : 64,
    borderRadius: (Platform.OS === 'ios') ? 72 : 64 / 2
  },
  txtTitleMiddle: {
    width: '80%',
    color: colors.white,
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

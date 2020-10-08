import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import colors from '../../themes/Colors'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingTop: 5
    // width: width
  },
  headDrawer: {
    flexDirection: 'column',
    paddingTop: 25,
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    backgroundColor: colors.buttonColor
  },
  txtName: {
    fontSize: 18,
    fontWeight:'500',
    padding:10,
    color: colors.white,
    textAlign:'center'
  },
  txtPhone: {
    fontSize: 13,
    color: colors.orange,
  },

  userInfo: {
    justifyContent: 'center'
  },
  flatListStyle: {
    // backgroundColor: '#00b3b3',
    flex:1,
    height: height/1.2
  },
  warpViettel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F7FAFC',
    padding: 15,
  },
  txtViettel: {
    color: colors.buttonColor,
    fontSize: 12
  }, //txtVersion
  txtVersion: {
    color: colors.buttonColor,
    marginBottom: 10,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
  }, //txtVersion
  icon: {
    marginRight: 20
  },
  txtItem: {
    marginLeft: 25,
    fontSize: 14,
    // color:'white'
  },
  iconStyle: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 25,
    height: 30
    // borderWidth:1
  },
})

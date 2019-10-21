import {Platform, StyleSheet} from 'react-native';
import { colors, dimensions } from './constant';


export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textstyles: {
    fontSize: 20,
    color: colors.Black,
  },
  cardstyle:{
    borderWidth: 1,
    borderColor: colors.Gray,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    width: '100%',
  },
  headertextstyles:{
    fontSize: 24,
    fontWeight: '500',
    color: colors.Black,
  },
  buttonstyles:{
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: colors.Black,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttontextstyles:{
    fontSize: 18,
    fontWeight: '500',
    color: colors.White,
  },
  textweight: {
    fontWeight: '600',
    color: colors.Gray
  },
  inputstyles: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10
  },
  segmenttext: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.White,
  },
  texttime: {
    fontSize: 45,
    fontWeight: '500',
    color: colors.Black,
    alignSelf: 'center'
  },
  textdate: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.Gray,
    alignSelf: 'center'
  },
  active: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.Black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactive: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.Black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activetext: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.White,
  },
  inactivetext: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.Black,
  }
});
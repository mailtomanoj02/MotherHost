import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';

const DomainAvailabilityScreen = () => {
  return (
    <View>
      <AppBar />
      <ScreenTitle title={'Domain Availability'} />
      <View style={styles.totalContainerStyle}>
        <Text style={styles.textStyle}>Congratulations!</Text>
        <Text style={styles.textStyle}>maduraihost.com available!</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.amountTextStyle}>{'$ 1040'}</Text>
          <Text style={styles.perMonthTextStyle}>{'  /mo'}</Text>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <View style={styles.buttonContainerStyle}>
              <Text style={styles.buttonTextStyle}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainerStyle: {
    backgroundColor: Colors.white,
    margin: 14,
    borderRadius: 10,
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.GREEN,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 14,
  },
  amountTextStyle: {
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    marginTop: 2,
  },
  perMonthTextStyle: {
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainerStyle: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 3,
    padding: 5,
  },
  buttonTextStyle: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: Colors.white,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});
export default DomainAvailabilityScreen;

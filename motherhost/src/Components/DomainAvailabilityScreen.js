import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useSelector} from 'react-redux';
import SkeletonLoader from './customUI/SkeletonLoader';

const DomainAvailabilityScreen = props => {
  let whoisData = useSelector(state => state.whoisData);
  let isLoading = useSelector(state => state.isLoading);
  let isAvailable = whoisData?.status?.toLowerCase() === 'available';
  const {domainName} = props.route.params;
  const AvailableView = () => {
    const onPress = () => {
      let arr = {

      };
    };
    return (
      <View style={styles.totalContainerStyle}>
        {isAvailable ? (
          <View>
            <Text style={[styles.textStyle, {color: Colors.GREEN}]}>
              Congratulations!
            </Text>
            <Text
              style={[
                styles.textStyle,
                {color: Colors.GREEN},
              ]}>{`${domainName} available!`}</Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.textStyle, {color: Colors.RED}]}>Oops!</Text>
            <Text
              style={[
                styles.textStyle,
                {color: Colors.RED},
              ]}>{`${domainName} not available!!`}</Text>
          </View>
        )}
        {isAvailable ? (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.amountTextStyle}>{'$ 1040'}</Text>
            <Text style={styles.perMonthTextStyle}>{'  /mo'}</Text>
            <TouchableOpacity
              style={styles.addToCartButtonStyle}
              onPress={onPress}>
              <View style={styles.buttonContainerStyle}>
                <Text style={styles.buttonTextStyle}>ADD TO CART</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <AppBar />
      <ScreenTitle title={'Domain Availability'} />
      {isLoading ? <SkeletonLoader /> : AvailableView()}
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
  addToCartButtonStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default DomainAvailabilityScreen;

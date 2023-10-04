import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useSelector} from 'react-redux';
import {getPriceBasedOnDomain} from '../utils/Utils';

const DomainAvailableView = ({addToCart, domainName}) => {
  let whoisData = useSelector(state => state.whoisData);
  let isAvailable = whoisData?.status?.toLowerCase() === 'available';
  let priceData = getPriceBasedOnDomain(domainName);

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
        <View style={styles.domainAvailableContainerStyle}>
          <Text style={styles.amountTextStyle}>{`₹ ${priceData}`}</Text>
          <Text style={styles.perMonthTextStyle}>{'  /mo'}</Text>
          <TouchableOpacity
            style={styles.addToCartButtonStyle}
            onPress={addToCart}>
            <View style={styles.buttonContainerStyle}>
              <Text style={styles.buttonTextStyle}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
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
  domainAvailableContainerStyle: {flexDirection: 'row', marginTop: 10},
});
export default DomainAvailableView;

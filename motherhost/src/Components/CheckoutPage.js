import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';

const CheckoutPage = () => {
  const [value, setValue] = useState('Monthly');
  const [isFocus, setIsFocus] = useState(null);
  const data = [
    {label: 'Monthly', value: 'Monthly'},
    {label: 'Yearly', value: 'Yearly'},
  ];
  const renderCartView = () => {
    return (
      <View style={styles.totalCheckoutContainer}>
        <Text style={{fontFamily: FONT_FAMILY.SEMI_BOLD}}>motherhost.com</Text>
        <View style={styles.cartContainerStyle}>
          <View style={styles.cartBoxStyle}>
            <TouchableOpacity style={styles.plusMinusButtonStyle}>
              <Image
                source={require('./../Images/RadioButton/minus.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
            <View style={styles.cartInnerViewStyle}>
              <Text style={styles.yearsTextStyle}>1 Year(s)</Text>
            </View>
            <TouchableOpacity style={styles.plusMinusButtonStyle}>
              <Image
                source={require('./../Images/RadioButton/plus.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>$1040.31</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={styles.totalCheckoutContainer}>
        <Text style={{fontFamily: FONT_FAMILY.SEMI_BOLD, fontSize: 14}}>
          Small Business
        </Text>
        <Text style={{marginTop: 10, fontSize: 13}}>
          30 WebsitesFree domain with annual plan60 GB SSD Storage Unlimited
          Data Transfer2 Email Accounts Each Domain 60 MySQL databases (200MB
          each)Free SSL Certificate
        </Text>
        <View style={styles.cartContainerStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>$ 899.00</Text>
        </View>
      </View>
    );
  };
  const renderOfferView = () => {
    return (
      <View style={[{flexDirection: 'row'}, styles.totalCheckoutContainer]}>
        <View style={{flex: 0.5}}>
          <Text style={{fontFamily: FONT_FAMILY.BOLD}}>Offers</Text>
          <View style={styles.discountInnerViewStyle}>
            <Image
              source={require('./../Images/RadioButton/discount.png')}
              style={{height: 25, width: 25}}
            />
            <Text style={{fontFamily: FONT_FAMILY.SEMI_BOLD, marginLeft: 5}}>
              Select a coupon code
            </Text>
          </View>
        </View>
        <View style={styles.viewOfferContainer}>
          <Text style={{fontFamily: FONT_FAMILY.BOLD, color: Colors.RED}}>
            View Offers
          </Text>
        </View>
      </View>
    );
  };
  const Divider = () => {
    return (
      <View
        style={[
          {backgroundColor: Colors.BORDER_TITLE, height: 1, width: '100%'},
        ]}
      />
    );
  };
  const renderTotalView = () => {
    const data = [
      {
        key1: 'Total',
        value1: '$ 2345.98',
      },
      {
        key1: 'Tax (CGST) 9%',
        value1: '$ 2345.98',
        key2: 'Tax (SGST) 9%',
        value2: '$ 2345.98',
      },
      {
        key1: 'Net. Total',
        value1: '$ 2345.98',
      },
    ];
    return (
      <View style={[styles.totalCheckoutContainer]}>
        {data.map((value, index) => {
          return (
            <View>
              <View style={[{flexDirection: 'row'}]}>
                <View style={{flex: 0.5, padding: 6}}>
                  <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>
                    {value.key1}
                  </Text>
                  {value.key2 ? (
                    <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>
                      {value.key2}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.viewOfferContainer}>
                  <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>
                    {value.value1}
                  </Text>
                  {value.value2 ? (
                    <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>
                      {value.value2}
                    </Text>
                  ) : null}
                </View>
              </View>
              {index !== data.length - 1 && Divider()}
            </View>
          );
        })}
      </View>
    );
  };

  const SubmitButton = title => {
    return (
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <ScreenTitle title={'Review & Checkout'} />
      <View style={{flex: 1}}>
        {renderCartView()}
        {renderDescription()}
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          {renderOfferView()}
          {renderTotalView()}
          {SubmitButton('Checkout & place Order')}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  totalCheckoutContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 10,
    padding: 10,
  },
  cartContainerStyle: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBoxStyle: {
    flex: 0.5,
    borderWidth: 0.8,
    borderColor: Colors.PLACEHOLDER_GREY,
    height: 30,
    flexDirection: 'row',
    borderRadius: 5,
  },
  cartInnerViewStyle: {
    backgroundColor: Colors.BORDER_TITLE,
    padding: 5,
    flex: 0.6,
  },
  yearsTextStyle: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.DARK_GREY,
  },
  plusMinusButtonStyle: {justifyContent: 'center', padding: 4, flex: 0.2},
  dropdown: {
    borderWidth: 1,
    width: '30%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTextStyle: {
    fontSize: 15,
    marginLeft: 5,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  itemTextStyle: {
    fontSize: 15,
  },
  itemContainerStyle: {
    height: 50,
  },
  discountContainerStyle: {
    // justifyContent: 'flex-end',
  },
  discountInnerViewStyle: {flexDirection: 'row', marginTop: 4},
  viewOfferContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.ORANGE,
    marginTop: 20,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 17,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});
export default CheckoutPage;

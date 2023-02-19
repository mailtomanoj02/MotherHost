import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../Config/Constant';
import {Dropdown} from 'react-native-element-dropdown';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {isValidString} from '../utils/Helper';
import {getPriceBasedOnDomain} from '../utils/Utils';
import ModalPopUp from './Modal';
import {LOGIN_API_DATA_SUCCESS} from '../redux/Type';

const CheckoutPage = props => {
  const [value, setValue] = useState('Monthly');
  const [isFocus, setIsFocus] = useState(null);
  let cartArrayState = useSelector(state => state.cartArrayData);
  const [cartArrayFromSearch, setCartArrayFromSearch] =
    useState(cartArrayState);
  const [showModal, setShowModal] = useState(false);
  const data = [
    {label: 'Monthly', value: 'Monthly'},
    {label: 'Yearly', value: 'Yearly'},
  ];
  useEffect(() => {
    if (cartArrayFromSearch.length === 0) {
      props.navigation.navigate(SCREEN_NAMES.HOME_SCREEN);
    }
  }, [cartArrayFromSearch, props.navigation]);
  const increaseRegPeriod = (index, value) => {
    setCartArrayFromSearch(prevCartArray => {
      const updatedCartArray = prevCartArray.map((item, i) => {
        if (i === index) {
          if (value === 'addregperiod') {
            return {
              ...item,
              regperiod:
                item.regperiod !== 10 ? item.regperiod + 1 : item.regperiod,
            };
          }
          if (value === 'subregperiod') {
            return {
              ...item,
              regperiod:
                item.regperiod !== 1 ? item.regperiod - 1 : item.regperiod,
            };
          }
        } else {
          return item;
        }
      });
      return updatedCartArray;
    });
  };
  const CartContainer = (item, index) => {
    let qty = item.regperiod;
    let priceData = getPriceBasedOnDomain(item.domain);
    let price = (priceData * qty).toFixed(2);
    const handleClose = () => {
      setShowModal(false);
    };
    const handleConfirm = () => {
      const newData = [...cartArrayFromSearch]; // Create a copy of the original array
      newData.splice(index, 1);
      setCartArrayFromSearch(newData);
      setShowModal(false);
    };
    return (
      <View style={styles.cartContainerStyle}>
        <View style={styles.cartBoxStyle}>
          <TouchableOpacity
            style={styles.plusMinusButtonStyle}
            onPress={() => {
              if (item?.regperiod > 1) {
                increaseRegPeriod(index, 'subregperiod');
              } else {
                setShowModal(true);
              }
            }}>
            <Image
              source={require('./../Images/RadioButton/minus.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
          <View style={styles.cartInnerViewStyle}>
            <Text style={styles.yearsTextStyle}>{`${qty} Year(s)`}</Text>
          </View>
          <TouchableOpacity
            style={styles.plusMinusButtonStyle}
            onPress={() => {
              if (item?.regperiod < 10) {
                increaseRegPeriod(index, 'addregperiod');
              } else {
                console.log(cartArrayFromSearch);
              }
            }}>
            <Image
              source={require('./../Images/RadioButton/plus.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontFamily: FONT_FAMILY.REGULAR}}>{`$ ${price}`}</Text>
        </View>
        <ModalPopUp
          visible={showModal}
          onConfirm={handleConfirm}
          onClose={handleClose}
          title={'Do you want to clear the cart'}
        />
      </View>
    );
  };

  const renderCartView = ({item, index}) => {
    return (
      <View>
        <View style={styles.totalCheckoutContainer}>
          <Text style={{fontFamily: FONT_FAMILY.SEMI_BOLD}}>
            motherhost.com
          </Text>
          {isValidString(item?.domain) ? CartContainer(item, index) : null}
        </View>
        {isValidString(item?.pid) ? renderDescription() : null}
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
        value1: '989.0',
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
            <View key={index}>
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
  // const objWithEmptyPid = cartArrayFromSearch.find(obj => obj.pid === '');
  // const regPeriod = objWithEmptyPid.regperiod;
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <ScreenTitle title={'Review & Checkout'} />
      <View style={{flex: 1}}>
        <FlatList data={cartArrayFromSearch} renderItem={renderCartView} />
        {/*{cartArrayFromSearch?.length > 0 ? renderCartView(regPeriod) : null}*/}
        {/*{renderDescription()}*/}
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

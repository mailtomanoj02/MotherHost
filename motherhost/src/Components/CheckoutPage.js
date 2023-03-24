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
import {FONT_FAMILY} from '../Config/Constant';
import {Dropdown} from 'react-native-element-dropdown';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isValidString, isValidElement} from '../utils/Helper';
import {getPriceBasedOnDomain} from '../utils/Utils';
import ModalPopUp from './Modal';
import {ADD_CART_ARRAY} from '../redux/Type';

const CheckoutPage = props => {
  const dispatch = useDispatch();
  const [deleteIndex, setIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(null);
  let cartArrayState = useSelector(state => state.cartArrayData);
  const [cartArrayFromSearch, setCartArrayFromSearch] =
    useState(cartArrayState);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotalValue] = useState(0.0);

  useEffect(() => {
    console.log('Checkout==>', cartArrayState);
    return () => {
      dispatch({type: ADD_CART_ARRAY, cartArrayData: cartArrayFromSearch});
    };
  }, [cartArrayFromSearch]);
  useEffect(() => {
    updateTotalInReceipt();
  }, [cartArrayFromSearch]);

  const changeArrayValue = (index, value, priceData = null) => {
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
          if (value === 'changeDuration') {
            return {
              ...item,
              selectedPrice: {
                key: priceData.key,
                value: priceData.value,
              },
            };
          }
          if (value === 'changePrice') {
            return {
              ...item,
              price: (item.regperiod * item.initialPrice).toFixed(2),
            };
          }
        } else {
          return item;
        }
      });
      return updatedCartArray;
    });
  };
  const updateTotalInReceipt = () => {
    let totalPrice = 0.0;
    if (cartArrayFromSearch?.length > 0) {
      cartArrayFromSearch.map(item => {
        if (isValidElement(item?.price)) {
          totalPrice = totalPrice + parseFloat(item?.price);
        }
        if (isValidElement(item?.selectedPrice?.value)) {
          totalPrice = totalPrice + parseFloat(item?.selectedPrice?.value);
        }
      });
      setTotalValue(totalPrice.toFixed(2));
    }
  };
  const plusMinusButtonView = (item, index) => {
    let qty = item.regperiod;
    let priceData = getPriceBasedOnDomain(item.domain);
    let price = (priceData * qty).toFixed(2);
    return (
      <View style={styles.cartBoxStyle}>
        <TouchableOpacity
          style={styles.plusMinusButtonStyle}
          onPress={() => {
            if (item?.regperiod > 1) {
              changeArrayValue(index, 'subregperiod');
              changeArrayValue(index, 'changePrice');
            } else {
              setIndex(index);
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
              changeArrayValue(index, 'addregperiod');
              changeArrayValue(index, 'changePrice');
            }
          }}>
          <Image
            source={require('./../Images/RadioButton/plus.png')}
            style={{height: 18, width: 18}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const CartContainer = (item, index) => {
    const handleClose = () => {
      setShowModal(false);
    };
    const handleConfirm = () => {
      const newData = [...cartArrayFromSearch];
      newData.splice(deleteIndex, 1);
      setCartArrayFromSearch(newData);
      setShowModal(false);
      // dispatch({type: ADD_CART_ARRAY, cartArrayData: newData});
    };
    return (
      <View style={styles.cartContainerStyle}>
        {item.domaintype !== 'update' ? (
          plusMinusButtonView(item, index)
        ) : (
          <Text style={{fontFamily: FONT_FAMILY.REGULAR, color: Colors.BLACK}}>
            Using existing domain
          </Text>
        )}
        <View>
          <Text
            style={{
              fontFamily: FONT_FAMILY.REGULAR,
              color: Colors.BLACK,
            }}>{`₹ ${item.price}`}</Text>
        </View>
        <ModalPopUp
          visible={showModal}
          onConfirm={handleConfirm}
          onClose={handleClose}
          title={'Do you want to clear item from the cart'}
        />
      </View>
    );
  };

  const renderCartView = ({item, index}) => {
    let name = 'motherhost.com';
    return (
      <View>
        <View style={styles.totalCheckoutContainer}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.SEMI_BOLD,
              color: Colors.DARK_GREY,
            }}>
            {name}
          </Text>
          {isValidString(item?.domain) ? CartContainer(item, index) : null}
        </View>
        {isValidString(item?.pid) ? renderDescription(item, index) : null}
      </View>
    );
  };

  const renderDescription = (item, index) => {
    const data = item.selectedPriceList;
    return (
      <View style={styles.totalCheckoutContainer}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.SEMI_BOLD,
            fontSize: 14,
            color: Colors.BLACK,
          }}>
          {item.descriptionData.title}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 13,
            fontFamily: FONT_FAMILY.REGULAR,
            color: Colors.BLACK,
          }}>
          {item.descriptionData.data}
        </Text>
        <View style={styles.cartContainerStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            data={data}
            maxHeight={300}
            labelField="key"
            valueField="value"
            value={data[0].value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              changeArrayValue(index, 'changeDuration', item);
              setIsFocus(false);
            }}
          />
          <Text style={{fontFamily: FONT_FAMILY.REGULAR, color: Colors.BLACK}}>
            {`₹ ${item?.selectedPrice?.value}`}
          </Text>
        </View>
      </View>
    );
  };
  const renderOfferView = () => {
    return (
      <View style={[{flexDirection: 'row'}, styles.totalCheckoutContainer]}>
        <View style={{flex: 0.5}}>
          <Text style={{fontFamily: FONT_FAMILY.BOLD, color: Colors.black}}>
            Offers
          </Text>
          <View style={styles.discountInnerViewStyle}>
            <Image
              source={require('./../Images/RadioButton/discount.png')}
              style={{height: 25, width: 25}}
            />
            <Text
              style={{
                fontFamily: FONT_FAMILY.SEMI_BOLD,
                marginLeft: 5,
                color: Colors.black,
              }}>
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
    const tax = ((total * 9) / 100).toFixed(2);
    const netTotal = parseFloat(total + 2 * tax).toFixed(2);
    const data = [
      {
        key1: 'Total',
        value1: `₹ ${total}`,
      },
      {
        key1: 'Tax (CGST) 9%',
        value1: `₹ ${tax}`,
        key2: 'Tax (SGST) 9%',
        value2: `₹ ${tax}`,
      },
      {
        key1: 'Net. Total',
        value1: `₹ ${netTotal}`,
      },
    ];
    return (
      <View style={[styles.totalCheckoutContainer]}>
        {data.map((value, index) => {
          return (
            <View key={index}>
              <View style={[{flexDirection: 'row'}]}>
                <View style={{flex: 0.5, padding: 6}}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY.REGULAR,
                      color: Colors.black,
                    }}>
                    {value.key1}
                  </Text>
                  {value.key2 ? (
                    <Text
                      style={{
                        fontFamily: FONT_FAMILY.REGULAR,
                        color: Colors.black,
                      }}>
                      {value.key2}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.viewOfferContainer}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY.REGULAR,
                      color: Colors.black,
                    }}>
                    {value.value1}
                  </Text>
                  {value.value2 ? (
                    <Text
                      style={{
                        fontFamily: FONT_FAMILY.REGULAR,
                        color: Colors.black,
                      }}>
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
  const cartArrayLength = cartArrayFromSearch?.length > 0;
  return (
    <View style={{flex: 1}}>
      <AppBar
        localCartArray={cartArrayFromSearch}
        setLocalCartArray={setCartArrayFromSearch}
      />
      <ScreenTitle title={'Review & Checkout'} />
      <View style={{flex: 1}}>
        {cartArrayLength ? (
          <>
            <FlatList data={cartArrayFromSearch} renderItem={renderCartView} />
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
              {/*{renderOfferView()}*/}
              {cartArrayLength ? renderTotalView() : null}
              {cartArrayLength > 0
                ? SubmitButton('Checkout & place Order')
                : null}
            </View>
          </>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.SEMI_BOLD,
                color: Colors.DARK_GREY,
              }}>
              Oops no item available in cart!!!!
            </Text>
          </View>
        )}
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
    width: '35%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTextStyle: {
    fontSize: 13,
    marginLeft: 5,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.black,
  },
  itemTextStyle: {
    fontSize: 13,
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

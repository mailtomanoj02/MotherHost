import React from 'react';
import {View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {SCREEN_NAMES} from '../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonLoader from './customUI/SkeletonLoader';
import {useState} from 'react';
import {getPriceBasedOnDomain, getUserId} from '../utils/Utils';
import {ADD_CART_ARRAY} from '../redux/Type';
import {showToastMessage} from './customUI/FlashMessageComponent/Helper';
import DomainAvailableView from './DomainAvailableView';

const DomainAvailabilityScreen = props => {
  let isLoading = useSelector(state => state.isLoading);
  let cartArrayState = useSelector(state => state.cartArrayData);
  const dispatch = useDispatch();
  const [cartArray, setCartArray] = useState([]);
  const {domainName} = props.route.params;

  const addToCart = () => {
    if (cartArrayState?.some(item => item.pid === '')) {
      showToastMessage('Item alreay in cart', Colors.RED);
    } else {
      let arrayParams = {
        clientid: getUserId(),
        paymentMethod: 'razorpay',
        domain: domainName,
        domaintype: 'register',
        pid: '',
        eppcode: '',
        regperiod: 1,
        billingcycle: 'monthly',
        initialPrice: getPriceBasedOnDomain(domainName),
        price: getPriceBasedOnDomain(domainName),
      };
      setCartArray(cartArray.push(arrayParams));
      dispatch({
        type: ADD_CART_ARRAY,
        cartArrayData: [...cartArrayState, ...cartArray],
      });
      props.navigation.navigate(SCREEN_NAMES.CHECKOUT_STACK_SCREEN);
    }
  };
  return (
    <View>
      <AppBar />
      <ScreenTitle title={'Domain Availability'} />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <DomainAvailableView addToCart={addToCart} domainName={domainName} />
      )}
    </View>
  );
};

export default DomainAvailabilityScreen;

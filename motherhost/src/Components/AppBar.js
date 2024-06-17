import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../Themes/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {SCREEN_NAMES} from '../Config/Constant';
import {isUserLoggedIn} from '../utils/Utils';
import ModalPopUp from './Modal';
import {useDispatch} from 'react-redux';
import {ADD_CART_ARRAY} from '../redux/Type';
const AppBar = props => {
  const dispatch = useDispatch();
  let imageBack = props.image
    ? props.image
    : require('./../Images/AppBar/left-arrow.png');
  const navigation = useNavigation();
  const route = useRoute();
  let screenName = route.name;
  const [showWallet, setShowWallet] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMinusCart, setShowMinusCart] = useState(false);
  useEffect(() => {
    if (screenName === 'Wallet' || screenName === 'Checkout') {
      const unsubscribe = navigation.addListener('focus', () => {
        if (screenName === 'Wallet') {
          setShowWallet(false);
        } else if (screenName === 'Checkout') {
          setShowMinusCart(true);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [navigation, screenName]);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleConfirm = () => {
    props.setLocalCartArray([]);
    dispatch({type: ADD_CART_ARRAY, cartArrayData: []});
    setShowModal(false);
  };
  return (
    <SafeAreaView>
      <View style={styles.containerStyle}>
        {isUserLoggedIn() ? (
          <TouchableOpacity
            style={styles.leftPressableStyle}
            onPress={() => {
              props.onPress === 'toggleDrawer'
                ? navigation.toggleDrawer()
                : navigation.goBack();
            }}>
            <Image
              style={props.image ? styles.hamBurgerStyle : styles.leftIconStyle}
              source={imageBack}
            />
          </TouchableOpacity>
        ) : null}
        <Image
          style={styles.logoStyle}
          source={require('./../Images/Logo/NameLogo-White.png')}
        />
        <View style={styles.walletCartViewStyle}>
          {isUserLoggedIn() && showWallet ? (
            <TouchableOpacity
              style={styles.walletCartButtonStyle}
              onPress={() => navigation.navigate(SCREEN_NAMES.WALLET)}>
              <Image
                source={require('./../Images/AppBar/wallet.png')}
                style={styles.walletCartImageStyle}
              />
            </TouchableOpacity>
          ) : null}

          {isUserLoggedIn() ? (
            <TouchableOpacity
              style={styles.walletCartButtonStyle}
              onPress={() =>
                showMinusCart
                  ? props.localCartArray?.length > 0
                    ? setShowModal(true)
                    : null
                  : navigation.navigate(SCREEN_NAMES.CHECKOUT_STACK_SCREEN, {
                      isFromCartIcon: true,
                    })
              }>
              <Image
                source={
                  route.name === SCREEN_NAMES.CHECKOUT_STACK_SCREEN
                    ? require('./../Images/AppBar/shopping-cart-empty.png')
                    : require('./../Images/AppBar/shopping-cart.png')
                }
                style={
                  route.name === SCREEN_NAMES.CHECKOUT_STACK_SCREEN
                    ? {width: 32, height: 32}
                    : styles.walletCartImageStyle
                }
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <ModalPopUp
          visible={showModal}
          onConfirm={handleConfirm}
          onClose={handleClose}
          title={'Do you want to clear item from the cart'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.headerBlue,
  },
  leftPressableStyle: {
    width: 30,
    height: '100%',
    justifyContent: 'center',
  },
  leftIconStyle: {
    width: 25,
    height: 25,
    margin: 10,
  },
  hamBurgerStyle: {
    width: 19,
    height: 19,
    margin: 10,
  },
  containerStyle: {
    height: 65,
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
  },
  logoStyle: {
    width: 120,
    height: '100%',
    marginLeft: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  walletCartViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  walletCartButtonStyle: {
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  walletCartImageStyle: {height: 24, width: 24},
});

export default AppBar;

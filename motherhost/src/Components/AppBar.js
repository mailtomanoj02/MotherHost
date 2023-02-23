import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../Themes/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {SCREEN_NAMES} from '../Config/Constant';

const AppBar = props => {
  let imageBack = props.image
    ? props.image
    : require('./../Images/AppBar/left-arrow.png');
  const navigation = useNavigation();
  const route = useRoute();
  let screenName = route.name;
  const [showWallet, setShowWallet] = useState(true);
  useEffect(() => {
    if (screenName === 'Wallet') {
      const unsubscribe = navigation.addListener('focus', () => {
        setShowWallet(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [navigation]);
  return (
    <SafeAreaView>
      <View style={styles.containerStyle}>
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
        <Image
          style={styles.logoStyle}
          source={require('./../Images/Logo/NameLogo-White.png')}
        />
        <View style={styles.walletCartViewStyle}>
          {showWallet ? (
            <TouchableOpacity
              style={styles.walletCartButtonStyle}
              onPress={() => navigation.navigate(SCREEN_NAMES.WALLET)}>
              <Image
                source={require('./../Images/AppBar/wallet.png')}
                style={styles.walletCartImageStyle}
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.walletCartButtonStyle}
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.CHECKOUT, {isFromCartIcon: true})
            }>
            <Image
              source={require('./../Images/AppBar/shopping-cart.png')}
              style={styles.walletCartImageStyle}
            />
          </TouchableOpacity>
        </View>
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

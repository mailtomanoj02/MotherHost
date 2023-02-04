import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import AppBar from './AppBar';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useEffect} from "react";
import {useSelector} from "react-redux";

const Wallet = () => {
  const creditBalance = useSelector(state => state.loginData?.credit);
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <View>
        <View style={styles.totalContainerStyle}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <Text style={styles.helloTextStyle}>Hello,</Text>
              <Text style={styles.nameText}>Ramnath k</Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <Image
                source={require('../Images/AppBar/appIconWallet.png')}
                style={styles.appIconImageStyle}
              />
            </View>
          </View>
          <View>
            <ImageBackground
              source={require('../Images/AppBar/img.png')}
              style={{height: 125, marginTop: 10}}
              imageStyle={{borderRadius: 20}}
            >
              <Text style={styles.amountStyle}>
                ₹ {creditBalance}
              </Text>
              <Text style={styles.totalBalanceStyle}>
                Total Balance
              </Text>
            </ImageBackground>
          </View>
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
  helloTextStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    fontSize: 12,
  },
  nameText: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 13,
    marginTop: 4,
  },
  appIconImageStyle: {
    height: 33,
    width: 33,
  },
  amountStyle: {
    color: Colors.white,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 40,
    marginLeft: 20,
    marginTop: 20
  },
  totalBalanceStyle: {
    color: Colors.white,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
    marginLeft: 20
  },
});

export default Wallet;

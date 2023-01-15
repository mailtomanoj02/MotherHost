import {View, StyleSheet, Text, Pressable} from 'react-native';
import AppBar from '../AppBar';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import {useState} from 'react';
import register from './Register';
import signIn from './SignIn';

const LoginAndRegistration = () => {
  const SCREEN_CONSTANTS = {
    REGISTER: 'REGISTER',
    SIGN_IN: 'SIGN IN',
  };
  const [isRegisterPressed, setIsRegisterPressed] = useState(true);
  const [isSignInPressed, setSignInPressed] = useState(false);
  const handleRegisterPressed = () => {
    setSignInPressed(false);
    setIsRegisterPressed(true);
  };
  const handleSignInPressed = () => {
    setSignInPressed(true);
    setIsRegisterPressed(false);
  };
  const RenderHeader = () => {
    return (
      <View style={styles.registerAndSignUpHeaderStyle}>
        <Pressable
          style={
            isRegisterPressed
              ? [styles.pressableContainerStyle, styles.borderBottomHeaderStyle]
              : styles.pressableContainerStyle
          }
          onPress={() => {
            handleRegisterPressed();
          }}>
          <Text style={styles.headerTextStyle}>
            {SCREEN_CONSTANTS.REGISTER}
          </Text>
        </Pressable>
        <Pressable
          style={
            isSignInPressed
              ? [styles.pressableContainerStyle, styles.borderBottomHeaderStyle]
              : styles.pressableContainerStyle
          }
          onPress={() => {
            handleSignInPressed();
          }}>
          <Text style={styles.headerTextStyle}>{SCREEN_CONSTANTS.SIGN_IN}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AppBar />
      {RenderHeader()}
      {isSignInPressed ? signIn() : register()}
    </View>
  );
};
export default LoginAndRegistration;
const styles = StyleSheet.create({
  registerAndSignUpHeaderStyle: {
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTextStyle: {
    color: Colors.white,
    width: '50%',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    textAlign: 'center',
  },
  pressableContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressedContainerStyle: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 6,
  },
  borderBottomHeaderStyle: {
    borderBottomWidth: 5,
    borderBottomColor: Colors.white,
  },
});

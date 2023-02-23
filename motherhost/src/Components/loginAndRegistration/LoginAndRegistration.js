import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppBar from '../AppBar';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import {useState} from 'react';
import SignIn from './SignIn';
import Register from './Register';

const LoginAndRegistration = props => {
  const SCREEN_CONSTANTS = {
    REGISTER: 'REGISTER',
    SIGN_IN: 'SIGN IN',
  };
  const {isFromLogin, isFromRegister} = props.route.params;
  const [isRegisterPressed, setIsRegisterPressed] = useState(isFromRegister);
  const [isSignInPressed, setSignInPressed] = useState(isFromLogin);
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
  console.log(isFromLogin);
  return (
    <View style={{flex: 1}}>
      <AppBar />
      {RenderHeader()}
      {isSignInPressed ? (
        <SignIn
          isRegisterPressed={setIsRegisterPressed}
          isSignInPressed={setSignInPressed}
          navigation={props.navigation}
        />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Register />
        </KeyboardAvoidingView>
      )}
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

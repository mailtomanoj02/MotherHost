import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import React from 'react';
import SubmitButton from './SubmitButton';
const SignIn = () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  return (
    <View style={styles.containerStyle} onTouchStart={() => Keyboard.dismiss()}>
      <Text style={styles.signInTextStyle}>SIGN IN</Text>
      <PlaceHolderComponent
        image={require('./../../Images/Login/img.png')}
        innerRef={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        params={{
          autoCapitalize: false,
          keyboardType: 'email-address',
          placeholder: 'Email Address',
        }}
      />
      <PlaceHolderComponent
        image={require('./../../Images/Login/img.png')}
        innerRef={passwordRef}
        keyName="done"
        params={{
          autoCapitalize: false,
          secureTextEntry: true,
          placeholder: 'Password',
        }}
      />
      <SubmitButton title={'SIGN IN'} />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.REGULAR,
            color: Colors.DARK_GREY,
            fontSize: 13,
          }}>
          New to Motherhost?
        </Text>
        <TouchableOpacity style={{paddingHorizontal: 5}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.REGULAR,
              color: Colors.DARK_GREY,
              fontSize: 13,
            }}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  containerStyle: {flex: 0.6, alignItems: 'center', justifyContent: 'center'},
  signInTextStyle: {
    color: colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 16,
  },
});

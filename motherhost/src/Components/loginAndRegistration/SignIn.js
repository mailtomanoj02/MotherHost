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
import React, {useRef, useState} from 'react';
import SubmitButton from './SubmitButton';
import Toast from '../Toast';
const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [toast, setToast] = useState(false);
  const onPress = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  return (
    <View style={styles.containerStyle} onTouchStart={() => Keyboard.dismiss()}>
      {toast ? (
        <Toast message={'Provide all information'} backgroundColor={'red'} />
      ) : null}
      <Text style={styles.signInTextStyle}>SIGN IN</Text>
      <PlaceHolderComponent
        image={require('../../Images/EntryIcons/user.png')}
        innerRef={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        params={{
          autoCapitalize: false,
          keyboardType: 'email-address',
          placeholder: 'Email Address',
        }}
      />
      <PlaceHolderComponent
        image={require('./../../Images/EntryIcons/key.png')}
        innerRef={passwordRef}
        keyName="done"
        params={{
          autoCapitalize: false,
          secureTextEntry: true,
          placeholder: 'Password',
        }}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onPress()}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
        {/*<Text>SUBMIT</Text>*/}
      </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.ORANGE,
    marginTop: 20,
    padding: 10,
    marginHorizontal: 12,
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 17,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});

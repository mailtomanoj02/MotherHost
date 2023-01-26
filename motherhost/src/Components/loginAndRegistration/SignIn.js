import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchAPIAction} from '../../redux/Action';
import {checkIsValidEmail, isValidElement} from '../../utils/Helper';
// import {showToast} from '../../utils/Utils';
const SignIn = ({isRegisterPressed, isSignInPressed}) => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginDetails, setLoginDetails] = useState({
    email: 'kramnath84@gmail.com',
    password: '$+X5J4W3kmJ%mBG',
  });

  const SubmitButtonSignIn = title => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (
            checkIsValidEmail(loginDetails.email) &&
            isValidElement(loginDetails.password)
          ) {
            dispatch(
              fetchAPIAction('validatelogin.php', {
                email: loginDetails.email,
                password2: loginDetails.password,
              }),
            );
          } else {
            console.log('Enter valid email or Password');
            // showToast('Manoj');
          }
        }}>
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerStyle} onTouchStart={() => Keyboard.dismiss()}>
      <Text style={styles.signInTextStyle}>SIGN IN</Text>
      <PlaceHolderComponent
        image={require('../../Images/EntryIcons/user.png')}
        innerRef={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        onChangeText={text => setLoginDetails({...loginDetails, email: text})}
        params={{
          autoCapitalize: false,
          value: 'kramnath84@gmail.com',
          keyboardType: 'email-address',
          placeholder: 'Email Address',
        }}
      />
      <PlaceHolderComponent
        image={require('./../../Images/EntryIcons/key.png')}
        innerRef={passwordRef}
        onChangeText={text =>
          setLoginDetails({...loginDetails, password: text})
        }
        keyName="done"
        showHide={true}
        params={{
          autoCapitalize: false,
          // secureTextEntry: true,
          value: '$+X5J4W3kmJ%mBG',
          placeholder: 'Password',
        }}
      />
      {SubmitButtonSignIn('SUBMIT')}
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={styles.textNewToMotherHostStyle}>New to Motherhost?</Text>
        <TouchableOpacity
          style={{paddingHorizontal: 5}}
          onPress={() => {
            isRegisterPressed(true);
            isSignInPressed(false);
          }}>
          <Text style={styles.textRegisterNowStyle}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  textNewToMotherHostStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    fontSize: 13,
  },
  textRegisterNowStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    fontSize: 13,
  },
});

export default SignIn;

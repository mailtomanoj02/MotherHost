import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../../redux/Action';
import ButtonLoader from '../customUI/ButtonLoader';
const SignIn = ({isRegisterPressed, isSignInPressed, navigation}) => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const isLoading = useSelector(state => state.isLoading);

  const SubmitButtonSignIn = title => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          dispatch(
            fetchAPIAction(
              'validatelogin.php',
              {
                email: loginDetails.email,
                password2: loginDetails.password,
              },
              true,
              'POST',
              navigation,
            ),
          );
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
          placeholder: 'Password',
        }}
      />
      {!isLoading ? SubmitButtonSignIn('SUBMIT') : <ButtonLoader />}
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

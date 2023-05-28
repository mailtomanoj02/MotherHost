import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import Colors from '../../Themes/Colors';
import {useEffect, useRef, useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {getIpAddress} from 'react-native-device-info';
import {fetchAPIAction} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import ButtonLoader from '../customUI/ButtonLoader';

const Register = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('IN');
  const [callCode, setCallCode] = useState('91');
  const [deviceIp, setDeviceIp] = useState('');
  const [registerDetails, setRegisterDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password2: '',
    phoneNumber: '',
    companyName: '',
    address1: '',
    country: '',
    city: '',
    state: '',
    postcode: '',
  });
  const visible = false;
  const withFilter = true;
  const withCallingCode = true;
  const withCallingCodeButton = true;
  const withCountryNameButton = true;
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCallCode(country.callingCode[0]);
  };
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const companyRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pinRef = useRef(null);
  const gstRef = useRef(null);
  const dispatch = useDispatch();
  let platform = Platform.OS;
  useEffect(() => {
    getIpAddress().then(res => setDeviceIp(res));
  }, []);

  const isLoading = useSelector(state => state.isLoading);

  const SubmitButton = title => {
    const {
      firstname,
      lastname,
      email,
      password2,
      phoneNumber,
      companyName,
      address1,
      country,
      city,
      state,
      postcode,
    } = registerDetails;

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          dispatch(
            fetchAPIAction(
              'clientadd.php',
              {
                action: 'AddClient', //hardcode
                firstname: firstname,
                lastname: lastname,
                email: email,
                password2: password2,
                phonenumber: phoneNumber,
                companyname: companyName,
                address1: address1,
                country: countryCode,
                city: city,
                state: state,
                postcode: postcode,
                clientip: deviceIp,
                usertype: platform === 'ios' ? 'IOSApp' : 'AndroidApp',
                playerid: 'jdshfjdhfk', // give dummy string
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
    <View style={styles.containerStyle}>
      <ScrollView>
        <Text style={styles.signInTextStyle}>Personal Details</Text>
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/user.png')}
          innerRef={firstNameRef}
          onSubmitEditing={() => lastNameRef.current.focus()}
          onChangeText={firstName =>
            setRegisterDetails({...registerDetails, firstname: firstName})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'First Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/user.png')}
          innerRef={lastNameRef}
          onSubmitEditing={() => emailRef.current.focus()}
          onChangeText={lastName =>
            setRegisterDetails({...registerDetails, lastname: lastName})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'Last Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/email.png')}
          innerRef={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={email =>
            setRegisterDetails({...registerDetails, email: email})
          }
          params={{
            autoCapitalize: false,
            keyboardType: 'email-address',
            placeholder: 'Email Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/key.png')}
          innerRef={passwordRef}
          onSubmitEditing={() => phoneRef.current.focus()}
          onChangeText={password =>
            setRegisterDetails({...registerDetails, password2: password})
          }
          showHide={true}
          params={{
            autoCapitalize: false,
            placeholder: 'Password',
          }}
        />
        <View style={styles.containerViewStyle}>
          <Image
            source={require('./../../Images/EntryIcons/phone.png')}
            style={styles.imageStyle}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CountryPicker
              {...{
                countryCode,
                withFilter,
                withCallingCode,
                onSelect,
                withCallingCodeButton,
                // withCountryNameButton,
                visible,
              }}
            />
          </View>
          <TextInput
            ref={phoneRef}
            onSubmitEditing={() => companyRef.current.focus()}
            onChangeText={phone =>
              setRegisterDetails({...registerDetails, phoneNumber: phone})
            }
            style={styles.textInputStyle}
            placeholder={'Phone Number'}
          />
        </View>
        <Text style={styles.signInTextStyle}>Billing Address</Text>
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/building.png')}
          innerRef={companyRef}
          onSubmitEditing={() => addressRef.current.focus()}
          onChangeText={companyName =>
            setRegisterDetails({...registerDetails, companyName: companyName})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'Company Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          innerRef={addressRef}
          onSubmitEditing={() => cityRef.current.focus()}
          onChangeText={address =>
            setRegisterDetails({...registerDetails, address1: address})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          innerRef={cityRef}
          onSubmitEditing={() => stateRef.current.focus()}
          onChangeText={city =>
            setRegisterDetails({...registerDetails, city: city})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'City',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          innerRef={stateRef}
          onSubmitEditing={() => pinRef.current.focus()}
          onChangeText={state =>
            setRegisterDetails({...registerDetails, state: state})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'State',
          }}
        />
        <View style={styles.containerViewStyle}>
          <Image
            source={require('./../../Images/EntryIcons/location.png')}
            style={styles.imageStyle}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CountryPicker
              {...{
                countryCode,
                withFilter,
                withCallingCode,
                onSelect,
                // withCallingCodeButton,
                withCountryNameButton,
                visible,
              }}
            />
          </View>
        </View>
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          innerRef={pinRef}
          onSubmitEditing={() => gstRef.current.focus()}
          onChangeText={pin =>
            setRegisterDetails({...registerDetails, postcode: pin})
          }
          params={{
            autoCapitalize: false,
            placeholder: 'Pin',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/tax.png')}
          innerRef={gstRef}
          params={{
            autoCapitalize: false,
            placeholder: 'GST Number',
          }}
        />
        {!isLoading ? (
          SubmitButton('REGISTER')
        ) : (
          <View style={styles.buttonLoaderViewStyle}>
            <ButtonLoader />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {flex: 1, marginBottom: 22},
  signInTextStyle: {
    color: colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 15,
    margin: 10,
    marginTop: 12,
  },
  containerViewStyle: {
    flexDirection: 'row',
    marginTop: 8,
    height: 50,
    backgroundColor: Colors.white,
    marginHorizontal: 15,
  },
  imageStyle: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 12,
    tintColor: Colors.headerBlue,
  },
  textInputStyle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    marginLeft: 20,
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
  buttonLoaderViewStyle: {flexDirection: 'row', justifyContent: 'center'},
});
export default Register;

import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import SubmitButton from './SubmitButton';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../../Themes/Colors';
import {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';

const Register = () => {
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState('India');
  const [callCode, setCallCode] = useState('');
  const visible = false;
  const withFilter = true;
  const withCallingCode = true;
  const withCallingCodeButton = true;
  const withCountryNameButton = true;
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(JSON.stringify(country));
    setCallCode(country.callingCode[0]);
  };
  return (
    <View style={styles.containerStyle}>
      <ScrollView>
        <Text style={styles.signInTextStyle}>Personal Details</Text>
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/user.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            placeholder: 'First Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/user.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            placeholder: 'Last Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/email.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            keyboardType: 'email-address',
            placeholder: 'Email Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/key.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
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
            style={styles.textInputStyle}
            placeholder={'Phone Number'}
          />
        </View>
        <Text style={styles.signInTextStyle}>Billing Address</Text>
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/building.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Company Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'City',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/location.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'State',
          }}
        />
        <View style={styles.containerViewStyle}>
          <Image
            source={require('./../../Images/EntryIcons/location.png')}
            style={styles.imageStyle}
          />
          {/*<TextInput*/}
          {/*  style={{*/}
          {/*    flex: 0.5,*/}
          {/*    flexDirection: 'row',*/}
          {/*    fontSize: 16,*/}
          {/*    marginLeft: 20,*/}
          {/*  }}*/}

          {/*/>*/}
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
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Pin',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/EntryIcons/tax.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'GST Number',
          }}
        />
        <SubmitButton title={'REGISTER'} />
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
});
export default Register;

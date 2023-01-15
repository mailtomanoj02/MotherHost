import {Keyboard, StyleSheet, Text, ScrollView, View} from 'react-native';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import PlaceHolderComponent from './PlaceHolderComponent';
import SubmitButton from './SubmitButton';

const Register = () => {
  return (
    <View style={styles.containerStyle} onTouchStart={() => Keyboard.dismiss()}>
      <ScrollView>
        <Text style={styles.signInTextStyle}>Personal Details</Text>
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            placeholder: 'First Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            placeholder: 'Last Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            keyboardType: 'email-address',
            placeholder: 'Email Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Password',
          }}
        />
        <Text style={styles.signInTextStyle}>Billing Address</Text>
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Company Name',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Address',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'City',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'State',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: '',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
          keyName="done"
          params={{
            autoCapitalize: false,
            secureTextEntry: true,
            placeholder: 'Pin',
          }}
        />
        <PlaceHolderComponent
          image={require('./../../Images/Login/img.png')}
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
  containerStyle: {flex: 1, paddingBottom: 22},
  signInTextStyle: {
    color: colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 15,
    margin: 10,
    marginTop: 12,
  },
});
export default Register;

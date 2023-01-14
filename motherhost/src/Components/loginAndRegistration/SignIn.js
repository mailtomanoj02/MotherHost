import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import colors from '../../Themes/Colors';
import {TextInput} from 'react-native-gesture-handler';
const SignIn = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.signInTextStyle}>SIGN IN</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 6,
          height: 48,
          backgroundColor: Colors.white,
          marginHorizontal: 15,
        }}>
        {/*<Image*/}
        {/*  source={require('./../../Images/Login/img.png')}*/}
        {/*  style={{width: 40, height: 40}}*/}
        {/*/>*/}
        <TextInput
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        />
      </View>
    </View>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  containerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  signInTextStyle: {
    color: colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 16,
  },
});

import {Text, TextInput, View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';

const CouponsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
      <AppBar />
      <ScreenTitle title={'Apple Coupons'} />
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.5,
          borderRadius: 4,
          marginHorizontal: 10,
          marginVertical: 10,
          borderColor: Colors.PLACEHOLDER_GREY,
          backgroundColor: Colors.white,
        }}>
        <TextInput
          style={{height: 35, flex: 0.8, marginHorizontal: 10}}
          placeholder={'Enter Coupon Code'}
        />
        <View
          style={{flex: 0.2, justifyContent: 'center', marginHorizontal: 10}}>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              color: Colors.ORANGE,
              fontFamily: FONT_FAMILY.BOLD,
            }}>
            Apply
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CouponsScreen;

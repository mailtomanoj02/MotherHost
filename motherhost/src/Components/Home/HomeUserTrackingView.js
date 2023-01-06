import React from 'react';
import {Text, View, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors.js';
import {FONT_FAMILY} from '../../Config/Constant.js';
const HomeUserTrackingView = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.titleViewStyle}>
        <Text style={styles.countTxtStyle}>{props.count}</Text>
        <Text style={styles.titleTxtStyle}>{props.title}</Text>
      </View>
      <Image
        style={{
          width: 30,
          height: 30,
          tintColor: Colors.headerBlue,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={props.img}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 75,
    margin: 5,
    borderRadius: 6,
    // borderWidth: 1,
    borderColor: Colors.headerBlue,
    padding: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.GreyBorderWhiteBG,
    shadowOffset: {width: -2, height: 5},
    shadowRadius: 3,
    elevation: 20,
    shadowOpacity: 0.2,
  },
  titleViewStyle: {
    height: 70,
    width: '60%',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  countTxtStyle: {
    fontSize: 20,
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  titleTxtStyle: {
    fontSize: 14,
    color: Colors.GreyBorderWhiteBG,
    fontFamily: FONT_FAMILY.BOLD,
  },
});

export default HomeUserTrackingView;

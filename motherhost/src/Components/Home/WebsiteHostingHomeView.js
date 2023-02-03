import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant';

const WebsiteHostingHomeView = props => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.HOSTING_SCREEN, {
          headerTitle: props.title,
          groupId: props.groupId,
        })
      }>
      <View style={styles.viewStyle}>
        <Image style={props.imgStyle} source={props.img} />
        <View style={styles.titleViewStyle}>
          <Text style={styles.titleTxtStyle}>{props.title}</Text>
          <Text style={styles.priceTxtStyle}>{props.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: Colors.headerBlue,
  },
  titleViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxtStyle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingTop: 5,
    textAlign: 'center',
  },
  priceTxtStyle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.REGULAR,
  },
});

export default WebsiteHostingHomeView;

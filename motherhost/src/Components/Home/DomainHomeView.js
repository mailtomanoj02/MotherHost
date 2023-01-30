import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Colors from '../../Themes/Colors.js';

const DomainHomeView = props => {
  return (
    <View style={styles.viewStyle}>
      <Image style={styles.imgStyle} source={props.img} />
      <View style={[styles.txtViewStyle, {backgroundColor: props.color}]}>
        <Text style={styles.txtStyle}>{`₹ ${props.price}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    height: 120,
    backgroundColor: Colors.white,
    margin: 8,
    borderRadius: 8,
    borderColor: Colors.backgroundColor,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: Colors.headerBlue,
  },
  imgStyle: {
    flex: 7,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  txtViewStyle: {
    flex: 3,
    margin: 8,
    justifyContent: 'center',
    borderRadius: 8,
  },
  txtStyle: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default DomainHomeView;

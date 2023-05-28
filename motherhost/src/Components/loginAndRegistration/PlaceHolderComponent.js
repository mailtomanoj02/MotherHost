import React from 'react';
import Colors from '../../Themes/Colors';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {FONT_FAMILY} from '../../Config/Constant';
import {useState} from 'react';

const PlaceHolderComponent = props => {
  const [hidePassword, setHidePassword] = useState(true);
  const constants = {
    SHOW: 'SHOW',
    HIDE: 'HIDE',
  };
  const renderShowHide = () => {
    return (
      <TouchableOpacity
        style={styles.buttonShowHideStyle}
        onPress={() => setHidePassword(!hidePassword)}>
        <Text style={styles.textShowHideStyle}>
          {hidePassword ? constants.SHOW : constants.HIDE}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.containerViewStyle}>
      <Image source={props.image} style={styles.imageStyle} />
      <TextInput
        style={styles.textInputStyle}
        ref={props.innerRef}
        returnKeyType={props.keyName}
        onSubmitEditing={props.onSubmitEditing}
        onChangeText={props.onChangeText}
        secureTextEntry={props.showHide ? hidePassword : false}
        {...props.params}
      />
      {props.showHide ? renderShowHide() : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  buttonShowHideStyle: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShowHideStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 10,
    color: Colors.headerBlue,
  },
});
export default PlaceHolderComponent;

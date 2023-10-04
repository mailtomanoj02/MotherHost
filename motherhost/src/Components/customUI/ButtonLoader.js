import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

const ButtonLoader = () => {
  return (
    <View style={styles.buttonContainerStyle}>
      <ActivityIndicator
        style={styles.loaderStyle}
        size="small"
        color={Colors.white}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainerStyle: {
    backgroundColor: Colors.buttonOrange,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  loaderStyle: {justifyContent: 'center', flex: 1},
});

export default ButtonLoader;

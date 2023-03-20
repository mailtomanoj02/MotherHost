import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Colors from '../../Themes/Colors';

const ButtonLoader = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.buttonOrange,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center'
      }}>
      <ActivityIndicator
        style={{justifyContent: 'center', flex: 1}}
        size="small"
        color={Colors.white}
      />
    </View>
  );
};

export default ButtonLoader;

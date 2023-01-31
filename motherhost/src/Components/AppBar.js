import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Touchable,
} from 'react-native';
import Colors from '../Themes/Colors';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

const AppBar = props => {
  let imageBack = props.image
    ? props.image
    : require('./../Images/AppBar/left-arrow.png');
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.containerStyle}>
        <Pressable
          style={styles.leftPressableStyle}
          onPress={() => {
            props.onPress === 'toggleDrawer'
              ? navigation.toggleDrawer()
              : navigation.goBack();
          }}>
          <Image
            style={props.image ? styles.hamBurgerStyle : styles.leftIconStyle}
            source={imageBack}
          />
        </Pressable>
        <Image
          style={styles.logoStyle}
          source={require('./../Images/Logo/NameLogo-White.png')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.headerBlue,
  },
  leftPressableStyle: {
    width: 30,
    height: '100%',
    justifyContent: 'center',
  },
  leftIconStyle: {
    width: 25,
    height: 25,
    margin: 10,
  },
  hamBurgerStyle: {
    width: 19,
    height: 19,
    margin: 10,
  },
  containerStyle: {
    height: 65,
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
  },
  logoStyle: {
    width: 120,
    height: '100%',
    marginLeft: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

export default AppBar;

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';

const ScreenTitle = ({title}) => {
  return (
    <View style={styles.headerViewContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  headerViewContainer: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_TITLE,
  },
  titleText: {
    fontSize: 17,
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});

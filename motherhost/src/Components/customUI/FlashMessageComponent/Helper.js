import {isValidString, isValidElement} from '../../../utils/Helper';
import {StyleSheet} from 'react-native';

import {showMessage} from './FlashMessage';
import Colors from '../../../Themes/Colors';
import {FONT_FAMILY} from '../../../Config/Constant';

export const showToastMessage = (message, color) => {
  if (isValidString(message)) {
    let flashMessageObject = {
      message: message,
      backgroundColor: color,
      color: Colors.white,
      duration: 2000,
      style: {borderRadius: 8},
      titleStyle: styles.welcomeTextStyle,
      icon: {icon: color === Colors.RED ? 'danger' : 'success'},
    };
    showMessage(flashMessageObject);
  }
};

const styles = StyleSheet.create({
  welcomeTextStyle: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingRight: 15,
  },
});

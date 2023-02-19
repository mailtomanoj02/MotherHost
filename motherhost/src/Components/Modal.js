import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import Colors from '../Themes/Colors';

const ModalPopUp = ({visible, onClose, onConfirm,title}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={[styles.buttonText, {color: colors.headerBlue}]}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={[styles.buttonText, {color: colors.headerBlue}]}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: Colors.BORDER_TITLE,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.BOLD,
  },
});

export default ModalPopUp

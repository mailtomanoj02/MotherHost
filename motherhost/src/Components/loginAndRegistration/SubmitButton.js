import Colors from '../../Themes/Colors';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../../Config/Constant';

const SubmitButton = ({title}) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => console.log('PRESSED')}>
      <Text style={styles.buttonTextStyle}>{title}</Text>
      {/*<Text>SUBMIT</Text>*/}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.ORANGE,
    marginTop: 20,
    padding: 10,
    marginHorizontal: 12,
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 17,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});
export default SubmitButton;

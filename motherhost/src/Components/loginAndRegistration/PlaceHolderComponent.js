import Colors from '../../Themes/Colors';
import {Image, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const PlaceHolderComponent = props => {
  return (
    <View style={styles.containerViewStyle}>
      <Image source={props.image} style={styles.imageStyle} />
      <TextInput
        style={styles.textInputStyle}
        ref={props.innerRef}
        returnKeyType={props.keyName}
        onSubmitEditing={props.onSubmitEditing}
        {...props.params}
      />
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
    width: 40,
    height: 40,
    alignItems: 'center',
    marginTop: 5,
  },
  textInputStyle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
  },
});
export default PlaceHolderComponent;
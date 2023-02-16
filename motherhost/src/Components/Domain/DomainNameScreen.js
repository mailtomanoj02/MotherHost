import {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
} from 'react-native';
import AppBar from '../AppBar';
import ScreenTitle from '../ScreenTitle';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import {Dropdown} from 'react-native-element-dropdown';

const DomainNameScreen = () => {
  const [option1Selected, setOption1Selected] = useState(true);
  const [option2Selected, setOption2Selected] = useState(false);
  const [option3Selected, setOption3Selected] = useState(false);
  const [value, setValue] = useState('com');
  const [eligible, setEligible] = useState('');
  const [isFocus, setIsFocus] = useState(null);
  const data = [
    {label: 'com', value: 'com'},
    {label: 'in', value: 'in'},
    {label: 'net', value: 'net'},
    {label: 'co.in', value: 'co.in'},
    {label: 'uk', value: 'uk'},
    {label: 'us', value: 'us'},
  ];

  const onPressOption1 = () => {
    setOption1Selected(true);
    setOption2Selected(false);
    setOption3Selected(false);
  };

  const onPressOption2 = () => {
    setOption1Selected(false);
    setOption2Selected(true);
    setOption3Selected(false);
  };

  const onPressOption3 = () => {
    setOption1Selected(false);
    setOption2Selected(false);
    setOption3Selected(true);
  };

  const domainAvailableView = () => {
    return (
      <View
        style={[
          styles.domainEligibleViewStyle,
          {
            backgroundColor: Colors.LIGHTGREEN,
            borderColor: Colors.BORDER_GREEN,
          },
        ]}>
        <Text
          style={[
            styles.domainEligibleHeaderTextStyle,
            {color: Colors.BORDER_GREEN},
          ]}>
          Your Domain is eligible for transfer.
        </Text>
        <Text
          style={[
            styles.domainEligibleDescriptionTextStyle,
            {color: Colors.BORDER_GREEN},
          ]}>
          Please ensure you have unlocked your domain at your current registrar
          before checkout.
        </Text>
      </View>
    );
  };
  const domainUnAvailableView = () => {
    return (
      <View
        style={[
          styles.domainEligibleViewStyle,
          {backgroundColor: Colors.LIGHT_RED, borderColor: Colors.BORDER_RED},
        ]}>
        <Text
          style={[
            styles.domainEligibleHeaderTextStyle,
            {color: Colors.BORDER_RED, textAlign: 'center'},
          ]}>
          Not eligible for transfer.
        </Text>
        <Text
          style={[
            styles.domainEligibleDescriptionTextStyle,
            {color: Colors.BORDER_RED},
          ]}>
          {
            'The domain you entered does not appear to be registered.\nIf the domain was registered recently, you may need to try again later.\nAlternatively, you can perform a search to register this domain'
          }
        </Text>
      </View>
    );
  };
  const SubmitButton = title => {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const renderDescription = (title, selected, onPress) => {
    return (
      <View style={styles.touchablePaddingStyle}>
        <TouchableOpacity style={styles.touchableButtonStyle} onPress={onPress}>
          {selected ? (
            <Image
              source={require('./../../Images/RadioButton/selected.png')}
              style={styles.radioImageSelectedStyle}
            />
          ) : (
            <Image
              source={require('./../../Images/RadioButton/unSelected.png')}
              style={styles.radioImageUnSelectedStyle}
            />
          )}
          <Text style={styles.txtDescriptionStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTextInput = selected => {
    return (
      <View>
        {selected ? (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginHorizontal: 5,
                fontFamily: FONT_FAMILY.REGULAR,
                alignSelf: 'center',
              }}>
              WWW.
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                width: '60%',
                height: 30,
                borderColor: Colors.PLACEHOLDER_GREY,
                borderRadius: 5,
                padding: 4,
                fontSize: 15,
              }}
              placeholder={'example'}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <ScreenTitle title={'Domain Name'} />
      <View style={styles.totalContainerStyle}>
        {renderDescription(
          'Register a new domain',
          option1Selected,
          onPressOption1,
        )}
        {renderTextInput(option1Selected)}
        {renderDescription(
          'Transfer your domain from another registrar',
          option2Selected,
          onPressOption2,
        )}
        {renderTextInput(option2Selected)}
        {renderDescription(
          'I will use my existing domain and update my name servers',
          option3Selected,
          onPressOption3,
        )}
        {renderTextInput(option3Selected)}
      </View>
      {SubmitButton('USE THIS DOMAIN')}
      {eligible === 'available'
        ? domainAvailableView()
        : eligible === 'unAvailable'
        ? domainUnAvailableView()
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  selected: {
    backgroundColor: 'blue',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    borderWidth: 1,
    width: '60%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 5,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  totalContainerStyle: {
    backgroundColor: Colors.white,
    margin: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER_TITLE,
    borderRadius: 8,
  },
  touchablePaddingStyle: {padding: 12},
  touchableButtonStyle: {flexDirection: 'row'},
  radioImageSelectedStyle: {
    height: 20,
    width: 20,
    tintColor: Colors.headerBlue,
  },
  radioImageUnSelectedStyle: {
    height: 20,
    width: 20,
    tintColor: Colors.DARK_GREY,
  },
  txtDescriptionStyle: {
    marginHorizontal: 7,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.ORANGE,
    marginTop: 5,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 5,
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 15,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  domainEligibleViewStyle: {
    margin: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 15,
  },
  domainEligibleHeaderTextStyle: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 19,
  },
  domainEligibleDescriptionTextStyle: {
    marginTop: 8,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 14,
  },
});

export default DomainNameScreen;

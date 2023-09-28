import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../Themes/Colors';
import AppBar from '../AppBar';
import ScreenTitle from '../ScreenTitle';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant';
import {checkIsValidDomain} from '../../utils/Helper';
import {showToastMessage} from '../customUI/FlashMessageComponent/Helper';
import {useDispatch} from 'react-redux';
import {fetchAPIAction} from '../../redux/Action';

const WhoIsLookUp = props => {
  const dispatch = useDispatch();
  const {screenName} = props.route.params;
  const [input, setInput] = useState('');
  let apiParams = {
    serviceName:
      screenName === SCREEN_NAMES.WHO_IS_LOOKUP ? 'WhoisService' : 'DNSService',
    domainName: input.replace(/ /g, ''),
  };
  const onPress = () => {
    if (checkIsValidDomain(input)) {
      dispatch(fetchAPIAction('domainwhois.php', apiParams));
      setInput('');
    } else {
      showToastMessage('Please enter a valid domain', Colors.RED);
    }
  };
  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title={SCREEN_ENUM[screenName].title} />
      <View style={styles.itemContainer}>
        <Text style={styles.descriptionTextStyle}>
          {SCREEN_ENUM[screenName].inputDescription}
        </Text>
        <View style={styles.inputContainerStyle}>
          <Text style={styles.wwwTextStyle}>WWW.</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder={'example.com'}
            placeholderTextColor={Colors.PLACEHOLDER_GREY}
            autoCapitalize={'none'}
            value={input}
            onChangeText={text => setInput(text)}
          />
        </View>
        <TouchableOpacity style={styles.LookupButtonStyle} onPress={onPress}>
          <View style={styles.buttonContainerStyle}>
            <Text style={styles.buttonTextStyle}>Lookup</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.userNoteStyle}>{SCREEN_ENUM[screenName].note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemContainer: {
    margin: 5,
    borderRadius: 6,
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.GreyBorderWhiteBG,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: Colors.BORDER_TITLE,
  },
  descriptionTextStyle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.DARK_GREY,
  },
  textInputStyle: {
    borderWidth: 1,
    width: '86%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    padding: 4,
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingHorizontal: 10,
  },
  wwwTextStyle: {
    marginHorizontal: 5,
    fontFamily: FONT_FAMILY.REGULAR,
    alignSelf: 'center',
  },
  LookupButtonStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: Colors.white,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    paddingHorizontal: 12,
  },
  buttonContainerStyle: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 3,
    padding: 8,
  },
  inputContainerStyle: {flexDirection: 'row', marginTop: 8},
  userNoteStyle: {fontSize: 13, padding: 10, color: Colors.DARK_GREY},
});

const SCREEN_ENUM = {
  WHO_IS_LOOKUP: {
    title: 'Whois Lookup',
    inputDescription: 'Find the public Whois information for a domain.',
    note: "NOTE: The Whois database allows anyone to look up the name, email address, phone number, and address of any domain owner. This is a requirement from ICANN, the regulatory body responsible for managing the domain name system.\n\nIf you don't want your information to be publicly available, you may be able to replace your personal information using Motherhost domain privacy service.. This is a free service that is available for most domain. extensions.\n\nWhois information is not real-time, so recent changes may not show up here.",
  },
  DNS_LOOKUP: {
    title: 'DNS Lookup',
    inputDescription: 'Find the public DNS information for a domain.',
    note: 'The Lookup allows anyone to look up the Domain name DNS records.\n\nDNS information is not 100% real-time, so recent changes may not show up here.',
  },
};
export default WhoIsLookUp;

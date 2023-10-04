import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Colors from '../../Themes/Colors';
import AppBar from '../AppBar';
import ScreenTitle from '../ScreenTitle';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant';
import {checkIsValidDomain} from '../../utils/Helper';
import {showToastMessage} from '../customUI/FlashMessageComponent/Helper';
import {fetchlocalApiRequest} from '../../Api/Api';
import {ScrollView} from 'react-native-gesture-handler';

const WhoIsLookUp = props => {
  const {screenName} = props.route.params;
  const [input, setInput] = useState('motherhost.com');
  const [filteredData, setFilteredData] = useState(null);
  const isWhoIsLookupScreen = screenName === SCREEN_NAMES.WHO_IS_LOOKUP;
  let apiParams = {
    serviceName: isWhoIsLookupScreen ? 'WhoisService' : 'DNSService',
    domainName: input.replace(/ /g, ''),
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showLookUpView, setShowLookUpView] = useState(false);

  useEffect(() => {
    if (filteredData !== null) {
      fadeAnim.setValue(0);
      setShowLookUpView(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setShowLookUpView(false);
    }
  }, [filteredData, fadeAnim]);
  const filterResponse = response => {
    const isWhoIsLookup = screenName === SCREEN_NAMES.WHO_IS_LOOKUP;
    const rawTextArray = isWhoIsLookup
      ? response?.WhoisRecord?.rawText
      : response?.DNSData?.dnsRecords;

    const result = [];

    if (!isWhoIsLookupScreen) {
      rawTextArray?.forEach(item => {
        if (item?.rawText) {
          const splittedArray = item.rawText.split(/\s+/);
          const target = splittedArray.slice(4).join(' ');
          result.push([...splittedArray.slice(0, 4), target]);
        }
      });
    } else {
      if (rawTextArray) {
        const splittedArray = rawTextArray?.split('\n');
        const index = splittedArray.findIndex(element =>
          element.includes('>>>'),
        );
        const target = splittedArray.slice(index).join('\n');
        result.push(...splittedArray.slice(0, index), target);
      }
    }

    return result;
  };
  const onPress = async () => {
    if (checkIsValidDomain(input)) {
      const data = await fetchlocalApiRequest('domainwhois.php', apiParams);
      const resultData = filterResponse(data);
      console.log(resultData);
      setFilteredData([...resultData]);
      // setInput ('');
    } else {
      showToastMessage('Please enter a valid domain', Colors.RED);
    }
  };
  const lookUpView = () => {
    return (
      <Animated.View style={[styles.totalContainer, {opacity: fadeAnim}]}>
        <ScrollView style={styles.container}>
          <View style={styles.table}>
            {filteredData.length > 0 ? (
              filteredData?.map((dataItem, index) =>
                !isWhoIsLookupScreen ? (
                  <View style={styles.row} key={index}>
                    <View style={[styles.keyCell, {flex: 2}]}>
                      <Text style={styles.cellText}>{dataItem[0]}</Text>
                    </View>
                    <View style={styles.keyCell}>
                      <Text style={styles.cellText}>{dataItem[1]}</Text>
                    </View>
                    <View style={styles.keyCell}>
                      <Text style={styles.cellText}>{dataItem[2]}</Text>
                    </View>
                    <View style={styles.keyCell}>
                      <Text style={styles.cellText}>{dataItem[3]}</Text>
                    </View>
                    <View style={[styles.keyCell, {flex: 4}]}>
                      <Text style={styles.cellText}>{dataItem[4]}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.row} key={index}>
                    {dataItem.includes(': ') && !dataItem.includes('>>>') ? (
                      <>
                        <View style={[styles.keyCell, {flex: 0.5}]}>
                          <Text style={styles.cellText}>
                            {dataItem.split(':')[0]}
                          </Text>
                        </View>
                        <View style={[styles.keyCell, {flex: 0.5}]}>
                          <Text style={styles.cellText}>
                            {dataItem.split(':')[1]}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <View style={[styles.keyCell]}>
                        <Text style={styles.cellText}>{dataItem}</Text>
                      </View>
                    )}
                  </View>
                ),
              )
            ) : (
              <Text style={styles.noDataTextStyle}>Oops No Data Found!!!</Text>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    );
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
      {showLookUpView ? (
        lookUpView()
      ) : (
        <Text style={styles.userNoteStyle}>{SCREEN_ENUM[screenName].note}</Text>
      )}
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
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.BOLD,
  },
  table: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: Colors.PLACEHOLDER_GREY,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.white,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Colors.PLACEHOLDER_GREY,
  },
  keyCell: {
    flex: 1,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRightWidth: 0.5,
    justifyContent: 'center',
    alighItems: 'center',
    padding: 10,
  },
  valueCell: {
    flex: 4,
    justifyContent: 'center',
    borderColor: Colors.PLACEHOLDER_GREY,
    // padding: 10,
  },
  cellText: {
    textAlign: 'left',
    fontSize: 13,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  noDataTextStyle: {
    textAlign: 'center',
    padding: 20,
    fontFamily: FONT_FAMILY.BOLD,
    color: Colors.RED,
  },
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
    note: 'NOTE: The Lookup allows anyone to look up the Domain name DNS records.\n\nDNS information is not 100% real-time, so recent changes may not show up here.',
  },
};
export default WhoIsLookUp;

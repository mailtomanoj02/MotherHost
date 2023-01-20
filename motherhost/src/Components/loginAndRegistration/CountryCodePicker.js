import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
// import {CountryPicker} from "react-native-country-codes-picker";
import CountryPicker from 'react-native-country-picker-modal';

const CountryCodePicker = () => {
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState('India');
  const [callCode, setCallCode] = useState('');
  const visible = false;
  const withFilter = true;
  const withCallingCode = true;
  const withCallingCodeButton = true;
  const withCountryNameButton = true;
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(JSON.stringify(country));
    setCallCode(country.callingCode[0]);
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withCallingCode,
          onSelect,
          withCallingCodeButton,
          // withCountryNameButton,
          visible,
        }}
      />
    </View>
  );
};

export default CountryCodePicker;

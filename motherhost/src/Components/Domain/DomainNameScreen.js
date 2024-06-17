import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import AppBar from '../AppBar';
import ScreenTitle from '../ScreenTitle';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant';
import {Dropdown} from 'react-native-element-dropdown';
import {fetchAPIAction} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import DomainAvailableView from '../DomainAvailableView';
import {ADD_CART_ARRAY, GET_WHOIS_API_DATA_SUCCESS} from '../../redux/Type';
import {getPriceBasedOnDomain, getUserId} from '../../utils/Utils';
import {showToastMessage} from '../customUI/FlashMessageComponent/Helper';

const DomainNameScreen = props => {
  const dispatch = useDispatch();
  let whoisData = useSelector(state => state.whoisData);
  let cartArrayState = useSelector(state => state.cartArrayData);
  const isLoading = useSelector(state => state.isLoading);
  const [registerSelected, setRegisterSelected] = useState(true);
  const [transferSelected, setTransferSelected] = useState(false);
  const [updateSelected, setUpdateSelected] = useState(false);
  const [show, setShow] = useState(false);
  const [extension, setExtension] = useState({
    register: 'com',
    transfer: 'com',
    update: 'com',
  });
  const [eligible, setEligible] = useState('');
  const [isFocus, setIsFocus] = useState(null);
  const [domainName, setDomainName] = useState({
    register: '',
    transfer: '',
    update: '',
  });
  const {pid, pricingINR, description, title} = props.route.params;
  let priceListArray = [
    {
      key: 'Monthly',
      value: pricingINR.monthly,
      prefix: pricingINR.prefix,
    },
    {
      key: 'Quarterly',
      value: pricingINR.quarterly,
      prefix: pricingINR.prefix,
    },
    {
      key: 'SemiAnnually',
      value: pricingINR.semiannually,
      prefix: pricingINR.prefix,
    },
    {
      key: 'Annually',
      value: pricingINR.annually,
      prefix: pricingINR.prefix,
    },
    {
      key: 'Biennially',
      value: pricingINR.biennially,
      prefix: pricingINR.prefix,
    },
    {
      key: 'Triennially',
      value: pricingINR.triennially,
      prefix: pricingINR.prefix,
    },
  ];

  const data = [
    {label: 'com', value: 'com'},
    {label: 'in', value: 'in'},
    {label: 'net', value: 'net'},
    {label: 'co.in', value: 'co.in'},
    {label: 'uk', value: 'uk'},
    {label: 'us', value: 'us'},
  ];
  useEffect(() => {
    let isAvailable = whoisData?.status;
    if (isAvailable === 'unavailable') {
      setEligible('available');
    } else if (isAvailable === 'available') {
      setEligible('unAvailable');
    }
  }, [whoisData]);

  const onPressOption1 = () => {
    setEligible('available');
    setRegisterSelected(true);
    setTransferSelected(false);
    setUpdateSelected(false);
  };

  const onPressOption2 = () => {
    setShow(false);
    setEligible('');
    setRegisterSelected(false);
    setTransferSelected(true);
    setUpdateSelected(false);
  };

  const onPressOption3 = () => {
    setShow(false);
    setEligible('');
    setRegisterSelected(false);
    setTransferSelected(false);
    setUpdateSelected(true);
  };

  const getDomain = () => {
    let domain;
    if (registerSelected) {
      domain = domainName.register + '.' + extension.register;
    } else if (transferSelected) {
      domain = domainName.transfer + '.' + extension.transfer;
    } else {
      domain = domainName.update + '.' + extension.update;
    }
    return domain;
  };
  let domainSearch = getDomain();

  let params = {
    action: 'DomainWhois',
    domain: domainSearch.toString().replace(/ /g, ''),
  };
  const onPressRegister = () => {
    dispatch(fetchAPIAction('whois.php', params));
    setShow(true);
  };
  const onPressTransfer = async () => {
    dispatch({type: GET_WHOIS_API_DATA_SUCCESS, whoisData: null});
    await dispatch(fetchAPIAction('whois.php', params));
  };
  const onPressUpdate = () => {
    if (domainName.update !== '') {
      addToCart();
      setEligible('available');
    } else {
      showToastMessage('Please Enter Domain Name', Colors.RED);
    }
  };
  const onPressCheckout = () => {
    transferSelected
      ? addToCart()
      : props.navigation.navigate(SCREEN_NAMES.CHECKOUT_STACK_SCREEN);

    props.navigation.navigate(SCREEN_NAMES.CHECKOUT_STACK_SCREEN);
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
  const SubmitButton = (isCheckout = false) => {
    return (
      <TouchableOpacity
        disabled={
          (isCheckout && !registerSelected && eligible !== 'available') ||
          (isCheckout && registerSelected && cartArrayState?.length < 1)
        }
        style={
          (isCheckout && !registerSelected && eligible !== 'available') ||
          (isCheckout && registerSelected && cartArrayState?.length < 1)
            ? [styles.buttonContainer, {opacity: 0.5}]
            : styles.buttonContainer
        }
        onPress={
          isCheckout
            ? onPressCheckout
            : registerSelected
            ? onPressRegister
            : transferSelected
            ? onPressTransfer
            : onPressUpdate
        }>
        <Text style={styles.buttonTextStyle}>
          {isCheckout
            ? 'CHECKOUT'
            : registerSelected
            ? 'REGISTER DOMAIN'
            : transferSelected
            ? 'TRANSFER DOMAIN'
            : 'USE THIS DOMAIN'}
        </Text>
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

  const renderTextInput = (selected, type) => {
    return (
      <View>
        {selected ? (
          <View style={styles.textInputContainerStyle}>
            <Text style={styles.wwwTextStyle}>WWW.</Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder={'example'}
              placeholderTextColor={Colors.PLACEHOLDER_GREY}
              autoCapitalize={'none'}
              value={
                type === 'register'
                  ? domainName.register
                  : type === 'transfer'
                  ? domainName.transfer
                  : domainName.update
              }
              onChangeText={value => {
                if (type === 'register') {
                  setShow(false);
                  setDomainName({...domainName, register: value});
                } else if (type === 'transfer') {
                  setEligible('');
                  setDomainName({...domainName, transfer: value});
                } else {
                  setDomainName({...domainName, update: value});
                }
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.dropDownTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={
                type === 'register'
                  ? extension.register
                  : type === 'transfer'
                  ? extension.transfer
                  : extension.update
              }
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                if (type === 'register') {
                  setExtension({...extension, register: item.value});
                } else if (type === 'transfer') {
                  setExtension({...extension, transfer: item.value});
                } else {
                  setExtension({...extension, update: item.value});
                }
                setIsFocus(false);
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  const addToCart = () => {
    if (
      cartArrayState?.some(
        obj => typeof obj.pid === 'number' && parseInt(obj.pid),
      )
    ) {
      showToastMessage('Item alreay in cart', Colors.RED);
    } else {
      let arrayParams = {
        clientid: getUserId(),
        paymentMethod: 'razorpay',
        domain: domainSearch,
        domaintype: registerSelected
          ? 'register'
          : transferSelected
          ? 'transfer'
          : '',
        pid: pid,
        eppcode: '',
        regperiod: 1,
        billingcycle: 'monthly',
        initialPrice: updateSelected ? 0 : getPriceBasedOnDomain(domainSearch),
        price: updateSelected ? 0 : getPriceBasedOnDomain(domainSearch),
        descriptionData: {
          title: title,
          data: description,
        },
        selectedPriceList: priceListArray,
        selectedPrice: {
          key: priceListArray[0].key,
          value: priceListArray[0].value,
        },
      };
      dispatch({
        type: ADD_CART_ARRAY,
        cartArrayData: [...cartArrayState, arrayParams],
      });
      showToastMessage('Item Added Successfully!!', Colors.GREEN);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <AppBar />
      <ScreenTitle title={'Domain Name'} />
      <View style={styles.totalContainerStyle}>
        {renderDescription(
          'Register a new domain',
          registerSelected,
          onPressOption1,
        )}
        {renderTextInput(registerSelected, 'register')}
        {renderDescription(
          'Transfer your domain from another registrar',
          transferSelected,
          onPressOption2,
        )}
        {renderTextInput(transferSelected, 'transfer')}
        {renderDescription(
          'I will use my existing domain and update my name servers',
          updateSelected,
          onPressOption3,
        )}
        {renderTextInput(updateSelected, 'update')}
      </View>
      {SubmitButton()}
      {registerSelected && show && !isLoading ? (
        <DomainAvailableView addToCart={addToCart} domainName={domainSearch} />
      ) : isLoading && registerSelected ? (
        <ActivityIndicator
          size={'large'}
          style={styles.activityIndicatorStyle}
        />
      ) : null}
      {transferSelected && eligible === 'available' && !isLoading ? (
        domainAvailableView()
      ) : transferSelected && eligible === 'unAvailable' && !isLoading ? (
        domainUnAvailableView()
      ) : isLoading && transferSelected ? (
        <ActivityIndicator
          size={'large'}
          style={styles.activityIndicatorStyle}
        />
      ) : null}
      <View style={styles.submitButtonContainer}>{SubmitButton(true)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
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
    fontSize: 15,
    marginLeft: 5,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.BLACK,
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
    color: Colors.BLACK,
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
  textInputStyle: {
    borderWidth: 1,
    width: '60%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    padding: 4,
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  submitButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  wwwTextStyle: {
    marginHorizontal: 5,
    fontFamily: FONT_FAMILY.REGULAR,
    alignSelf: 'center',
  },
  textInputContainerStyle: {flexDirection: 'row'},
  dropDownTextStyle: {
    color: Colors.BLACK,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
  },
  activityIndicatorStyle: {marginTop: 30},
});

export default DomainNameScreen;

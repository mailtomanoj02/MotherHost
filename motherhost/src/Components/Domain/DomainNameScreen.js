import {useEffect, useState} from 'react';
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
import {
  ADD_CART_ARRAY,
  GET_WHOIS_API_DATA_SUCCESS,
  LOGIN_API_DATA_SUCCESS,
} from '../../redux/Type';
import {getPriceBasedOnDomain, getUserId} from '../../utils/Utils';
import {showToastMessage} from '../customUI/FlashMessageComponent/Helper';

const DomainNameScreen = props => {
  const dispatch = useDispatch();
  let whoisData = useSelector(state => state.whoisData);
  const isLoading = useSelector(state => state.isLoading);
  const [option1Selected, setOption1Selected] = useState(true);
  const [option2Selected, setOption2Selected] = useState(false);
  const [option3Selected, setOption3Selected] = useState(false);
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
    setEligible('');
    setOption1Selected(true);
    setOption2Selected(false);
    setOption3Selected(false);
  };

  const onPressOption2 = () => {
    setShow(false);
    setEligible('');
    setOption1Selected(false);
    setOption2Selected(true);
    setOption3Selected(false);
  };

  const onPressOption3 = () => {
    setShow(false);
    setEligible('');
    setOption1Selected(false);
    setOption2Selected(false);
    setOption3Selected(true);
  };

  const getDomain = () => {
    let domain;
    if (option1Selected) {
      domain = domainName.register + '.' + extension.register;
    } else if (option2Selected) {
      domain = domainName.transfer + '.' + extension.transfer;
    } else {
      domain = domainName.update + '.' + extension.update;
    }
    return domain;
  };
  let domainSearch = getDomain();

  let params = {
    action: 'DomainWhois',
    domain: domainSearch,
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
    setEligible('available');
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
        disabled={isCheckout && eligible !== 'available'}
        style={
          isCheckout && eligible !== 'available'
            ? [styles.buttonContainer, {opacity: 0.5}]
            : styles.buttonContainer
        }
        onPress={
          isCheckout
            ? addToCart
            : option1Selected
            ? onPressRegister
            : option2Selected
            ? onPressTransfer
            : onPressUpdate
        }>
        <Text style={styles.buttonTextStyle}>
          {isCheckout
            ? 'CHECKOUT'
            : option1Selected
            ? 'REGISTER DOMAIN'
            : option2Selected
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
              style={styles.textInputStyle}
              placeholder={'example'}
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
                  setDomainName({...domainName, register: value});
                } else if (type === 'transfer') {
                  setDomainName({...domainName, transfer: value});
                } else {
                  setDomainName({...domainName, update: value});
                }
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              selectedTextStyle={styles.selectedTextStyle}
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
  let cartArrayState = useSelector(state => state.cartArrayData);
  const [cartArray, setCartArray] = useState(cartArrayState);
  const addToCart = () => {
    const hasValidPid = cartArrayState?.some(
      obj => typeof obj.pid === 'number' && parseInt(obj.pid),
    );
    if (
      cartArrayState?.some(
        obj => typeof obj.pid === 'number' && parseInt(obj.pid),
      )
    ) {
      showToastMessage('Item alreay in cart', Colors.RED);
    } else {
      console.log(domainSearch);
      let arrayParams = {
        clientid: getUserId(),
        paymentMethod: 'razorpay',
        domain: domainSearch,
        domaintype: option1Selected
          ? 'register'
          : option2Selected
          ? 'transfer'
          : 'update',
        pid: pid,
        eppcode: '',
        regperiod: 1,
        billingcycle: 'monthly',
        initialPrice: option3Selected ? 0 : getPriceBasedOnDomain(domainSearch),
        price: option3Selected ? 0 : getPriceBasedOnDomain(domainSearch),
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
      setCartArray(cartArray.push(arrayParams));
      dispatch({type: ADD_CART_ARRAY, cartArrayData: cartArray});
      showToastMessage('Item Added Successfully!!', Colors.GREEN);
      // props.navigation.navigate(SCREEN_NAMES.CHECKOUT);
    }
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
        {renderTextInput(option1Selected, 'register')}
        {renderDescription(
          'Transfer your domain from another registrar',
          option2Selected,
          onPressOption2,
        )}
        {renderTextInput(option2Selected, 'transfer')}
        {renderDescription(
          'I will use my existing domain and update my name servers',
          option3Selected,
          onPressOption3,
        )}
        {renderTextInput(option3Selected, 'update')}
      </View>
      {SubmitButton()}
      {option1Selected && show && !isLoading ? (
        <DomainAvailableView addToCart={addToCart} domainName={domainSearch} />
      ) : isLoading && option1Selected ? (
        <ActivityIndicator size={'large'} style={{marginTop: 30}} />
      ) : null}
      {option2Selected && eligible === 'available' && !isLoading ? (
        domainAvailableView()
      ) : option2Selected && eligible === 'unAvailable' && !isLoading ? (
        domainUnAvailableView()
      ) : isLoading && option2Selected ? (
        <ActivityIndicator size={'large'} style={{marginTop: 30}} />
      ) : null}
      <View style={styles.submitButtonContainer}>{SubmitButton(true)}</View>
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
  textInputStyle: {
    borderWidth: 1,
    width: '60%',
    height: 30,
    borderColor: Colors.PLACEHOLDER_GREY,
    borderRadius: 5,
    padding: 4,
    fontSize: 15,
  },
  submitButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default DomainNameScreen;

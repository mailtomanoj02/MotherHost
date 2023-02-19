import {isValidElement, isValidString} from './Helper';
import {selectUserID, selectUserName} from './Selectors';
import {state} from './Selectors';

export const isUserLoggedIn = () => {
  let userId = selectUserID();
  return isValidElement(userId);
};
export const getUserId = () => {
  let userId = '';
  if (isValidElement(selectUserID())) {
    userId = selectUserID();
  }
  return userId;
};

export const getUserName = () => {
  let userName = '';
  if (isValidElement(selectUserName())) {
    userName = selectUserName();
  }
  return userName;
};

export const getAddress = () => {
  let address = '';
  let loginData = state().loginData;
  let name = loginData?.fullname ? loginData.fullname : '';
  let address1 = loginData?.address1 ? loginData.address1 : '';
  let city = loginData?.city ? loginData.city : '';
  let stateData = loginData?.fullstate ? loginData.fullstate : '';
  let postcode = loginData?.postcode ? loginData.postcode : '';
  let countryName = loginData?.countryname ? loginData.countryname : '';
  address = `${isValidString(name) ? name + ',' : ''}\n${
    isValidString(address1) ? address1 + ',' : ''
  }\n${isValidString(city) ? city + ', ' : ''}${
    isValidString(stateData) ? stateData + ', ' : ''
  }${isValidString(postcode) ? postcode + ', ' : ''}\n${
    isValidString(countryName) ? countryName : ''
  }`;
  return address;
};

export const getPricingData = () => {
  let pricingData = state().pricingData;
  let priceList = isValidElement(pricingData) ? pricingData : '';
  let comPrice = isValidElement(priceList[0]?.com.register)
    ? priceList[0].com.register
    : '';
  let netPrice = isValidElement(priceList[1]?.net.register)
    ? priceList[1].net.register
    : '';
  let inPrice = isValidElement(priceList[2]?.in.register)
    ? priceList[2].in.register
    : '';
  let coInPrice = isValidElement(priceList[3]?.['co.in']?.register)
    ? priceList[3]?.['co.in']?.register
    : '';
  let ukPrice = isValidElement(priceList[4]?.uk?.register)
    ? priceList[4]?.uk?.register
    : '';
  let usPrice = isValidElement(priceList[5]?.us?.register)
    ? priceList[5]?.us?.register
    : '';
  let orgPrice = isValidElement(priceList[4]?.org?.register)
    ? priceList[6]?.org?.register
    : '';
  return {comPrice, netPrice, inPrice, coInPrice, ukPrice, usPrice, orgPrice};
};

export const getPriceBasedOnDomain = domain => {
  const priceList = getPricingData();
  const comPrice = priceList.comPrice;
  const netPrice = priceList.netPrice;
  const inPrice = priceList.inPrice;
  const coInPrice = priceList.coInPrice;
  const ukPrice = priceList.ukPrice;
  const usPrice = priceList.usPrice;
  const orgPrice = priceList.orgPrice;
  let priceData;
  if (domain.includes('com')) {
    priceData = comPrice;
  } else if (domain.includes('net')) {
    priceData = netPrice;
  } else if (domain.includes('in')) {
    priceData = inPrice;
  } else if (domain.includes('co.in')) {
    priceData = coInPrice;
  } else if (domain.includes('uk')) {
    priceData = ukPrice;
  } else if (domain.includes('us')) {
    priceData = usPrice;
  } else if (domain.includes('org')) {
    priceData = orgPrice;
  } else {
    priceData = null;
  }
  return priceData;
};

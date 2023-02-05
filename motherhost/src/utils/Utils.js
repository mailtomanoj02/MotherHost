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

import {isValidElement} from './Helper';
import {selectUserID, selectUserName} from './Selectors';
import {Store} from '../redux/store';

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
  const state = Store.getState();
  if (isValidElement(selectUserName())) {
    userName = selectUserName();
  }
  return userName;
};

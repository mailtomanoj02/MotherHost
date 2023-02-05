import {Store} from '../redux/store';
export const state = () => {
  return Store.getState();
};
export const selectUserID = () => state().loginData?.userid;
export const selectUserName = () => state().loginData?.fullname;

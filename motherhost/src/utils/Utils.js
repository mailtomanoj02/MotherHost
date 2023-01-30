import {useSelector} from 'react-redux';
import {isValidElement} from './Helper';

// eslint-disable-next-line react-hooks/rules-of-hooks
const loginData = useSelector(state => state.loginData);
export const isUserLoggedIn = () => {
  return isValidElement(loginData?.userid);
};

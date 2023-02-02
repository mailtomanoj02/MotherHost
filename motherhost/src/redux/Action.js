import {
  REQUEST_API_DATA,
  INVOICE_API_DATA_SUCCESS,
  DOMAIN_API_DATA_SUCCESS,
  API_DATA_FAILURE,
  SERVICE_API_DATA_SUCCESS,
  LOGIN_API_DATA_SUCCESS,
  REGISTER_API_DATA_SUCCESS,
  RESPONSE_API_DATA,
  GET_PRICING_API_DATA_SUCCESS,
} from './Type';
import {fetchAPIRequest} from '../Api/Api';
import {showToastMessage} from '../Components/customUI/FlashMessageComponent/Helper';
import Colors from '../Themes/Colors';
import {isValidElement} from '../utils/Helper';
import {SCREEN_NAMES} from '../Config/Constant';

export const requestApiData = () => {
  return {
    type: REQUEST_API_DATA,
  };
};

export const fetchAPIAction =
  (url, params, loader = true, method = 'POST', navigation = null) =>
  dispatch => {
    if (loader) {
      dispatch({type: REQUEST_API_DATA});
    }
    fetchAPIRequest(url, params, method, navigation)
      .then(res => {
        const data = res?.data;

        if (url === 'getinvoices.php') {
          dispatch({
            type: INVOICE_API_DATA_SUCCESS,
            invoiceData: data.invoices.invoice,
          });
        } else if (url === 'getclientsdomains.php') {
          dispatch({
            type: DOMAIN_API_DATA_SUCCESS,
            domainData: data.domains.domain,
          });
        } else if (url === 'getclientsproducts.php') {
          dispatch({
            type: SERVICE_API_DATA_SUCCESS,
            serviceData: data.products.product,
          });
        } else if (url === 'validatelogin.php') {
          dispatch({
            type: LOGIN_API_DATA_SUCCESS,
            loginData: data,
          });
          if (data) {
            if (data.result !== 'success') {
              showToastMessage(data.message, Colors.RED);
            } else if (data.result === 'success') {
              navigation.reset({
                index: 0,
                routes: [{name: SCREEN_NAMES.HOME_SCREEN}],
              });
            }
          }
        } else if (url === 'clientadd.php') {
          dispatch({
            type: REGISTER_API_DATA_SUCCESS,
            registerData: data,
          });
        } else if (url === 'gettldprice.php') {
          if (isValidElement(data[0]?.com.register)) {
            dispatch({
              type: GET_PRICING_API_DATA_SUCCESS,
              pricingData: data,
            });
          }
        }
        if (loader) {
          dispatch({type: RESPONSE_API_DATA});
        }
      })
      .catch(e => {
        dispatch({
          type: API_DATA_FAILURE,
          data: e,
        });
        if (loader) {
          dispatch({type: RESPONSE_API_DATA});
        }
      });
  };

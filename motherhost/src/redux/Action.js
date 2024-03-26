import {
  REQUEST_API_DATA,
  INVOICE_API_DATA_SUCCESS,
  DOMAIN_API_DATA_SUCCESS,
  API_DATA_FAILURE,
  SERVICE_API_DATA_SUCCESS,
  LOGIN_API_DATA_SUCCESS,
  RESPONSE_API_DATA,
  GET_PRICING_API_DATA_SUCCESS,
  GET_PRODUCTS_API_DATA_SUCCESS,
  GET_WHOIS_API_DATA_SUCCESS,
  INVOICE_DETAIL_API_DATA_SUCCESS,
  TICKET_LIST_API_DATA_SUCCESS,
  REGISTER_API_DATA_SUCCESS,
  CHECKOUT_API_SUCCESS,
  ADD_CART_ARRAY,
  LOOKUP_API_SUCCESS,
} from './Type';
import {fetchAPIRequest} from '../Api/Api';
import {showToastMessage} from '../Components/customUI/FlashMessageComponent/Helper';
import Colors from '../Themes/Colors';
import {isValidElement} from '../utils/Helper';
import {SCREEN_NAMES} from '../Config/Constant';
import {isNetworkConnectionAvailable} from './../utils/Utils';
export const requestApiData = () => {
  return {
    type: REQUEST_API_DATA,
  };
};

export const fetchAPIAction = (
  url,
  params,
  loader = true,
  method = 'POST',
  navigation = null,
  isFromCheckout,
) => {
  return async dispatch => {
    const isNetworkAvailable = await isNetworkConnectionAvailable();
    if (!isNetworkAvailable) {
      showToastMessage('There is no network connection available.', Colors.RED);
      return;
    }
    if (loader) {
      dispatch({type: REQUEST_API_DATA});
    }
    fetchAPIRequest(url, params, method)
      .then(res => {
        const data = res?.data;
        if (url === 'getinvoices.php') {
          if (params.action === 'GetInvoices') {
            dispatch({
              type: INVOICE_API_DATA_SUCCESS,
              invoiceData: data.invoices.invoice,
            });
          } else {
            dispatch({
              type: INVOICE_DETAIL_API_DATA_SUCCESS,
              invoiceDetailData: data,
            });
          }
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
          console.log('called==>');
          dispatch({
            type: LOGIN_API_DATA_SUCCESS,
            loginData: data,
          });
          if (data) {
            if (data.result === 'success') {
              if (isFromCheckout) {
                navigation.pop();
              } else {
                console.log('Manoj=====>');
                navigation.reset({
                  index: 0,
                  routes: [{name: SCREEN_NAMES.HOME_SCREEN}],
                });
              }
            }
          }
        } else if (url === 'clientadd.php') {
          dispatch({
            type: REGISTER_API_DATA_SUCCESS,
            registerData: data,
          });
          if (data) {
            if (data.result === 'success') {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAMES.LOGIN_REGISTRATION,
                    params: {
                      isFromRegister: false,
                      isFromLogin: true,
                    },
                  },
                ],
              });
              showToastMessage('Registered Successfully!!', Colors.GREEN);
            }
          }
        } else if (url === 'gettldprice.php') {
          if (isValidElement(data[0]?.com.register)) {
            dispatch({
              type: GET_PRICING_API_DATA_SUCCESS,
              pricingData: data,
            });
          }
        } else if (url === 'getproducts.php') {
          dispatch({
            type: GET_PRODUCTS_API_DATA_SUCCESS,
            productData: data,
          });
        } else if (url === 'whois.php') {
          dispatch({
            type: GET_WHOIS_API_DATA_SUCCESS,
            whoisData: data,
          });
        } else if (url === 'gettickets.php') {
          if (params.action === 'GetTickets') {
            dispatch({
              type: TICKET_LIST_API_DATA_SUCCESS,
              ticketData: data?.tickets?.ticket,
            });
          } else {
            showToastMessage('Ticket Successfully Created', Colors.GREEN);
            navigation.goBack();
          }
        } else if (url === 'addinvoicepayment.php') {
          dispatch({type: ADD_CART_ARRAY, cartArrayData: []});
        } else if (url === 'addorder.php') {
          dispatch({
            type: CHECKOUT_API_SUCCESS,
            checkoutData: data,
          });
        } else if (url === 'domainwhois.php') {
          return data;
        }
        if (loader) {
          dispatch({type: RESPONSE_API_DATA});
        }
        if (data.result !== 'success' || !isValidElement(data.result)) {
          showToastMessage(data.message, Colors.RED);
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
};

import {
  REQUEST_API_DATA,
  INVOICE_API_DATA_SUCCESS,
  DOMAIN_API_DATA_SUCCESS,
  API_DATA_FAILURE,
  SERVICE_API_DATA_SUCCESS,
} from './Type';
import {fetchAPIRequest} from '../Api/Api';

export const requestApiData = () => {
  return {
    type: REQUEST_API_DATA,
  };
};

export const fetchAPIAction =
  (url, params, method = 'POST') =>
  dispatch => {
    fetchAPIRequest(url, params, method)
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
        }
      })
      .catch(e => {
        dispatch({
          type: API_DATA_FAILURE,
          data,
        });
      });
  };

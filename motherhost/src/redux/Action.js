import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA_SUCCESS,
  RECEIVE_API_DATA_FAILURE,
} from './Type';
import axios from 'axios';
export const requestApiData = () => {
  return {
    type: REQUEST_API_DATA,
  };
};

export const receiveApiDataSuccess = data => {
  return {
    type: RECEIVE_API_DATA_SUCCESS,
    data,
  };
};

export const receiveApiDataFailure = error => ({
  type: RECEIVE_API_DATA_FAILURE,
  error,
});
const BASE_URL = 'https://api.motherhost.com/app/';

export const fetchInvoiceData = dispatch => {
  console.log('called');
  dispatch(requestApiData);
  axios
    .request({
      method: 'POST',
      url: BASE_URL + 'getinvoices.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        action: 'GetInvoices',
        userid: 41,
        orderby: 'duedate',
        order: 'desc',
      },
    })
    .then(response => {
      dispatch(receiveApiDataSuccess(response.data.invoices.invoice));
    })
    .catch(error => {
      console.log(error);
      dispatch(receiveApiDataFailure(error));
    });
};

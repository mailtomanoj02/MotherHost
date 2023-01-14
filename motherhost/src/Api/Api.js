import axios from 'axios';
import {requestApiData} from '../redux/Action';
import {Store} from '../redux/store';

const BASE_URL = 'https://api.motherhost.com/app/';

export const fetchAPIRequest = (url, params, method = 'POST') => {
  console.log('API METHOD CALLED');
  Store.dispatch(requestApiData);
  axios
    .request({
      method: method,
      url: BASE_URL + url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
    .then(response => {
      console.log('response == ', response);
      return response;
    })
    .catch(error => {
      return error;
    });
};

const mapDispatchToProps = dispatch => {
  return {
    renderLoader: dispatch(requestApiData),
  };
};
// data: {
//     action: 'GetInvoices',
//         userid: 41,
//         orderby: 'duedate',
//         order: 'desc',
// },
// dispatch(receiveApiDataSuccess(response.data.invoices.invoice));

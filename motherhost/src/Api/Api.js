import axios from 'axios';
import {Buffer} from 'buffer';
const BASE_URL = 'https://api.motherhost.com/app/';

export const fetchAPIRequest = (url, params, method = 'POST', includeAuth) => {
  console.log('API Called');
  let userName = 'rzp_live_NRitIpeIamRiYC';
  let password = 'QLNnSQS21jYsT5NQm4EVqeBV';
  let header = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    if (includeAuth) {
      header.Authorization =
        'Basic ' + Buffer.from(userName + ':' + password).toString('base64');
    }
  }

  return new Promise((resolve, reject) => {
    console.log(header);
    axios
      .request({
        method: method,
        url: BASE_URL + url,
        headers: header,
        data: params,
      })
      .then(response => {
        // console.log('response == ', response)
        resolve(response);
      })
      .catch(error => {
        // console.log('error == ', error)
        reject(error);
      });
  });
};

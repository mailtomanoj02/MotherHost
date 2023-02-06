import axios from 'axios';
import {Buffer} from 'buffer';
let BASE_URL = 'https://api.motherhost.com/app/';

export const fetchAPIRequest = (url, params, method = 'POST', includeAuth) => {
  console.log('API Called ', url);
  let userName = 'rzp_live_NRitIpeIamRiYC';
  let password = 'QLNnSQS21jYsT5NQm4EVqeBV';
  let header = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    header.Authorization =
        'Basic ' + Buffer.from(userName + ':' + password).toString('base64');

  }
  if (url.includes('orders')) {
    BASE_URL = 'https://api.razorpay.com/v1/';
  }
  console.log(header)
  console.log(params)
  console.log(BASE_URL+url)

  return new Promise((resolve, reject) => {
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

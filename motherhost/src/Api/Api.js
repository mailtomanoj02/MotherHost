import axios from 'axios';
import {Buffer} from 'buffer';
let BASE_URL = 'https://api.motherhost.com/app/';

export const fetchAPIRequest = (url, params, method = 'POST') => {
  console.log('API Called ', url);
  let header = {
    'Content-Type': 'application/json',
  };
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

export const fetchRazorAPIRequest = async (total, invoiceId) => {
  console.log('called');
  let userName = 'dummy@rzp_live_NRitIpeIamRiYC';
  let password = 'dummy@QLNnSQS21jYsT5NQm4EVqeBV';
  let razorParams = {
    amount: total * 100,
    currency: 'INR',
    receipt: invoiceId.toString(),
    partial_payment: false,
    first_payment_min_amount: 0,
  };
  return await axios
    .request({
      method: 'POST',
      url: 'https://api.razorpay.com/v1/orders',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(userName + ':' + password).toString('base64'),
        'Content-Type': 'application/json',
      },
      data: razorParams,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // console.log(error);
    });
};

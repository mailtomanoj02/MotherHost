import axios from 'axios';
import {Buffer} from 'buffer';
let BASE_URL = 'https://api.motherhost.com/app/';

export const fetchAPIRequest = (url, params, method = 'POST') => {
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
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fetchRazorAPIRequest = async (total, invoiceId) => {
  let userName = 'rzp_live_NRitIpeIamRiYC';
  let password = 'QLNnSQS21jYsT5NQm4EVqeBV';
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
      console.log(error);
    });
};

export const fetchlocalApiRequest = async (url, params, method = 'POST') => {
  let header = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.request({
      method: method,
      url: BASE_URL + url,
      headers: header,
      data: params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

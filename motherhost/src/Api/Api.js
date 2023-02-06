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

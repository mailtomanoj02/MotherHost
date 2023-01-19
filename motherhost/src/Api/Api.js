import axios from 'axios';
import { receiveApiDataSuccess } from './../redux/Action'
const BASE_URL = 'https://api.motherhost.com/app/';


export const fetchAPIRequest = (url, params, method = 'POST') => {
  return new Promise((resolve, reject) => {
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
        // console.log('response == ', response)
        resolve(response);
      })
      .catch(error => {
        // console.log('error == ', error)
        reject(error)
      });

  })
}


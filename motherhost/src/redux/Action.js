import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA_SUCCESS,
  RECEIVE_API_DATA_FAILURE,
} from './Type';
import axios from 'axios';
export const requestApiData = () => {
  console.log('requestApiData called');
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


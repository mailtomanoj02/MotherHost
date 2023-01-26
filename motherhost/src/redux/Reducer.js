import {
  REQUEST_API_DATA,
  INVOICE_API_DATA_SUCCESS,
  DOMAIN_API_DATA_SUCCESS,
  SERVICE_API_DATA_SUCCESS,
  LOGIN_API_DATA_SUCCESS,
  API_DATA_FAILURE,
} from './Type';

const initialState = {
  isLoading: false,
  error: null,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_API_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICE_API_DATA_SUCCESS:
      return {
        ...state,
        invoiceData: action.invoiceData,
      };
    case DOMAIN_API_DATA_SUCCESS:
      return {
        ...state,
        domainData: action.domainData,
      };
    case SERVICE_API_DATA_SUCCESS:
      return {
        ...state,
        serviceData: action.serviceData,
      };
    case LOGIN_API_DATA_SUCCESS:
      return {
        ...state,
        loginData: action.loginData,
      };
    case API_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

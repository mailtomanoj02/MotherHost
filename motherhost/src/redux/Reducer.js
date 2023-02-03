import {
  REQUEST_API_DATA,
  INVOICE_API_DATA_SUCCESS,
  DOMAIN_API_DATA_SUCCESS,
  SERVICE_API_DATA_SUCCESS,
  LOGIN_API_DATA_SUCCESS,
  REGISTER_API_DATA_SUCCESS,
  API_DATA_FAILURE,
  RESPONSE_API_DATA,
  GET_PRICING_API_DATA_SUCCESS,
  GET_PRODUCTS_API_DATA_SUCCESS,
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
    case RESPONSE_API_DATA:
      return {
        ...state,
        isLoading: false,
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
      console.log('LOGIN_API_DATA_SUCCESS CALLED');
      return {
        ...state,
        loginData: action.loginData,
      };
    case REGISTER_API_DATA_SUCCESS:
      return {
        ...state,
        registerData: action.registerData,
      };
    case GET_PRICING_API_DATA_SUCCESS:
      return {
        ...state,
        pricingData: action.pricingData,
      };
    case GET_PRODUCTS_API_DATA_SUCCESS:
      return {
        ...state,
        productData: action.productData,
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

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
  GET_WHOIS_API_DATA_SUCCESS,
  INVOICE_DETAIL_API_DATA_SUCCESS,
  RAZOR_ORDER_ID_INFO_API_DATA_SUCCESS,
  ADD_CART_ARRAY,
  HOSTING_DATA,
  TICKET_LIST_API_DATA_SUCCESS,
  CHECKOUT_API_SUCCESS,
  SET_AUTHENTICATION_STATUS,
  LOOKUP_API_SUCCESS,
  PROMOTION_API_SUCCESS,
  USER_SELECTED_COUPON,
} from './Type';

const initialState = {
  isLoading: false,
  error: null,
  invoiceData: null,
  invoiceDetailData: null,
  domainData: null,
  serviceData: null,
  loginData: null,
  registerData: null,
  productData: null,
  cartArrayData: [],
  hostingData: null,
  ticketData: null,
  checkoutData: null,
  isUserAuthenticated: false,
  lookUpData: null,
  promotions: null,
  selectedCouponData: null,
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
    case INVOICE_DETAIL_API_DATA_SUCCESS:
      return {
        ...state,
        invoiceDetailData: action.invoiceDetailData,
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
    case GET_WHOIS_API_DATA_SUCCESS:
      return {
        ...state,
        whoisData: action.whoisData,
      };
    case RAZOR_ORDER_ID_INFO_API_DATA_SUCCESS:
      return {
        ...state,
        razorOrderIdData: action.razorOrderIdData,
      };
    case ADD_CART_ARRAY:
      return {
        ...state,
        cartArrayData: action.cartArrayData,
      };
    case HOSTING_DATA:
      return {
        ...state,
        hostingData: action.hostingData,
      };
    case TICKET_LIST_API_DATA_SUCCESS:
      return {
        ...state,
        ticketData: action.ticketData,
      };
    case CHECKOUT_API_SUCCESS:
      return {
        ...state,
        checkoutData: action.checkoutData,
      };
    case API_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SET_AUTHENTICATION_STATUS:
      return {
        ...state,
        isUserAuthenticated: action.isUserAuthenticated,
      };
    case LOOKUP_API_SUCCESS:
      return {
        ...state,
        lookUpData: action.lookUpData,
      };
    case PROMOTION_API_SUCCESS:
      return {
        ...state,
        promotions: action.promotions,
      };
    case USER_SELECTED_COUPON:
      return {
        ...state,
        selectedCouponData: action.payload,
      };
    default:
      return state;
  }
};

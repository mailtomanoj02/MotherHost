import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA_FAILURE,
  RECEIVE_API_DATA_SUCCESS,
} from './Type';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const mainReducer = (state = initialState, action) => {
  console.log('mainReducer called');
  switch (action.type) {
    case REQUEST_API_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_API_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case RECEIVE_API_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};



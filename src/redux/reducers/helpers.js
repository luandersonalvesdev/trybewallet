// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  FETCH_CURRENCY_LOADING,
  FETCH_CURRENCY_FINISH_LOADING,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
};

const helpers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_CURRENCY_FINISH_LOADING:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default helpers;

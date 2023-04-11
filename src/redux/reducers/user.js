// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default user;

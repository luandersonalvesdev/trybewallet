// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCY_SUCCESS,
  ADD_EXPENSE,
  ADD_CURRENCIES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  idExpenses: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      idExpenses: state.idExpenses + 1,
    };
  case FETCH_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case DELETE_EXPENSE:
    state.expenses.splice(action.payload, 1);
    return {
      ...state,
      expenses: [...state.expenses],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSE:
    console.log(action.payload);
    return {
      ...state,
      editor: false,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;

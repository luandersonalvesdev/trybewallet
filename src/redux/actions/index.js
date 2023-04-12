// Coloque aqui suas actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_LOADING = 'FETCH_CURRENCY_LOADING';
export const FETCH_CURRENCY_FINISH_LOADING = 'FETCH_CURRENCY_FINISH_LOADING';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const loginAction = (data) => ({
  type: LOGIN_ACTION,
  payload: data,
});

export const addCurrencies = (data) => ({
  type: ADD_CURRENCIES,
  payload: data,
});

export const addExpense = (data) => ({
  type: ADD_EXPENSE,
  payload: data,
});

// Coloque aqui suas actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_LOADING = 'FETCH_CURRENCY_LOADING';
export const FETCH_CURRENCY_FINISH_LOADING = 'FETCH_CURRENCY_FINISH_LOADING';

export const loginAction = (data) => ({
  type: LOGIN_ACTION,
  payload: data,
});

export const fetchCurrencySuccess = (data) => ({
  type: FETCH_CURRENCY_SUCCESS,
  payload: data,
});

export const fetchCurrencyLoading = () => ({
  type: FETCH_CURRENCY_LOADING,
});

export const fetchCurrencyFinishLoading = () => ({
  type: FETCH_CURRENCY_FINISH_LOADING,
});

export const fetchCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  // const dataToArray = Object.keys(data).map((key) => ({ [key]: data[key] }));
  const dataToArray = Object.keys(data);
  dispatch(fetchCurrencySuccess(dataToArray));
};

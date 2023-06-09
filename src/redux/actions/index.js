// Coloque aqui suas actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';

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

export const deleteExpenseAction = (index) => ({
  type: DELETE_EXPENSE,
  payload: index,
});

export const editExpenseAction = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditExpenseAction = (data) => ({
  type: SAVE_EDIT_EXPENSE,
  payload: data,
});

export const saveEditExpenseThunk = (data, wallet) => (dispatch) => {
  const newExpenses = wallet.expenses.map((expense) => {
    if (expense.id === wallet.idToEdit) {
      const { id, exchangeRates } = expense;
      return { ...data, id, exchangeRates };
    }
    return expense;
  });
  dispatch(saveEditExpenseAction(newExpenses));
};

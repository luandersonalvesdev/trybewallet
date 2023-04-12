import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpense,
  addCurrencies,
} from '../redux/actions';

import fetchAPI from '../helpers/fetchAPI';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const data = await fetchAPI();
    delete data.USDT;
    const allAcronyms = Object.keys(data);
    const { dispatch } = this.props;
    dispatch(addCurrencies(allAcronyms));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  addExpenses = async () => {
    const exchangeRates = await fetchAPI();
    const { dispatch, idExpenses } = this.props;
    const dataForm = { ...this.state, id: idExpenses, exchangeRates };
    dispatch(addExpense(dataForm));
    this.setState(() => ({ value: '', description: '' }));
  };

  render() {
    const { allCurrencies } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <label>
          Valor da despesa
          <input
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
          />
        </label>

        <label>
          Descrição da despesa
          <input
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
          />
        </label>

        <label>
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {
              !allCurrencies.length
                ? <option>Carregando</option>
                : (

                  allCurrencies.map((curr) => (
                    <option key={ curr }>{curr}</option>
                  ))
                )
            }
          </select>
        </label>

        <label>
          Método de pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label>
          Método de pagamento
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button onClick={ this.addExpenses }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  allCurrencies: wallet.currencies,
  idExpenses: wallet.idExpenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);

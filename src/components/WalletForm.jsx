import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, addCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
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
    const { dispatch, idExpenses } = this.props;
    await dispatch(fetchCurrency());
    const { allCurrencies } = this.props;
    dispatch(addExpense({ ...this.state, id: idExpenses, exchangeRates: allCurrencies }));
    this.setState(() => ({
      value: '',
      description: '',
    }));
  };

  render() {
    const { allCurrencies } = this.props;
    const { value, description } = this.state;
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
          >
            {
              !allCurrencies.length
                ? <option>Carregando</option>
                : (

                  allCurrencies.map((currency) => (
                    <option key={ currency } value={ currency }>{currency}</option>
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
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>

        <label>
          Método de pagamento
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
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

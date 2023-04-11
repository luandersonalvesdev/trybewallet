import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { allCurrencies } = this.props;
    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <label>
          Valor da despesa
          <input type="number" data-testid="value-input" />
        </label>

        <label>
          Descrição da despesa
          <input type="text" data-testid="description-input" />
        </label>

        <label>
          Moeda
          <select name="currency" id="currency" data-testid="currency-input">
            {
              !allCurrencies.length
                ? <option>Carregando</option>
                : (
                  allCurrencies.map((currency) => (
                    <option key={ currency } value={ currency }>{currency}</option>))
                )
            }
          </select>
        </label>

        <label>
          Método de pagamento
          <select name="method" id="method" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>

        <label>
          Método de pagamento
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  allCurrencies: wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  deleteExpense = (index) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenseAction(index));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenseAction(id));
  };

  render() {
    const { allExpenses, wallet } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            allExpenses.map((expense, index) => {
              const {
                description, tag, method, value, exchangeRates, currency, id,
              } = expense;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => { this.editExpense(id); } }
                    >
                      Editar
                    </button>

                    <button
                      data-testid="delete-btn"
                      onClick={ () => { this.deleteExpense(index); } }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  allExpenses: wallet.expenses,
  wallet,
});

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);

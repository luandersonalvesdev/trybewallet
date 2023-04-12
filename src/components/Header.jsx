import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalExpense } = this.props;
    const total = totalExpense.reduce((acc, expense) => {
      acc += (expense.value) * expense.exchangeRates[expense.currency].ask;
      return acc;
    }, 0).toFixed(2);
    return (
      <div>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  totalExpense: wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpense: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

const SIX = 6;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  loginAndRedirect = (emailInput) => {
    const { login, history } = this.props;
    login(emailInput);
    history.push('/carteira');
  };

  render() {
    const { emailInput, passwordInput } = this.state;
    const checkEmailAndPassword = emailInput.includes('@')
      && emailInput.includes('.com')
      && passwordInput.length >= SIX;

    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <label>
          Email
          <input
            onChange={ this.handleChange }
            name="emailInput"
            type="text"
            data-testid="email-input"
          />
        </label>
        <label>
          Senha
          <input
            onChange={ this.handleChange }
            name="passwordInput"
            type="password"
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ !checkEmailAndPassword }
          onClick={ () => { this.loginAndRedirect(emailInput); } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (emailInput) => dispatch(loginAction(emailInput)),
});

Form.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
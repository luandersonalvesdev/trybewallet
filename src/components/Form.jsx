import React, { Component } from 'react';
import { connect } from 'react-redux';

const SIX = 6;

class Form extends Component {
  state = {
    emailInput: '',
    passwordInput: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
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
        <button disabled={ !checkEmailAndPassword }>Entrar</button>
      </form>
    );
  }
}

export default connect()(Form);

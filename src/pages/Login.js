import React from 'react';
import PropTypes from 'prop-types';
import FormLogin from '../components/FormLogin';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return <FormLogin history={ history } />;
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Login;

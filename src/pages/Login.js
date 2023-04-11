import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return <Form history={ history } />;
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Login;

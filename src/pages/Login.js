import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const MINIMUM_NAME_LENGTH = 3;

    const {
      user, isLoading,
      handleUserSubmit, handleInputChange,
    } = this.props;

    const isButtonDisabled = user ? user.length < MINIMUM_NAME_LENGTH : true;
    return (
      <div data-testid="page-login">
        {isLoading ? (
          <Loading />
        ) : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              name="user"
              value={ user }
              onChange={ handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              onClick={ handleUserSubmit }
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleUserSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Login;

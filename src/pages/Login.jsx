import React, { useContext, useEffect, useState } from 'react';
import PropType from 'prop-types';
import RecipeContext from '../context/RecipeContext';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [isInvalidPassword, setIsInvalidPassword] = useState(true);

  const { user, setUser } = useContext(RecipeContext);

  useEffect(() => {
    const emailValidation = () => {
      const [name, domain] = email.split('@');
      if (!domain) return true;
      const subDomains = domain.split('.');
      const minimalLength = 4;
      return (
        subDomains.length < 2
        || subDomains[0].length < minimalLength
        || subDomains[1] === ''
        || name.length < minimalLength
        || [name, ...subDomains].some((fragment) => fragment.match(/\W/))
      );
    };
    setIsInvalidEmail(emailValidation());
  }, [email, setIsInvalidEmail]);

  useEffect(() => {
    const minimalLength = 6;
    setIsInvalidPassword(password.length <= minimalLength);
  }, [password, setIsInvalidPassword]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUser({ ...user, email });
    history.push('foods');
  };

  return (
    <div className="Login">
      <h3>Login</h3>
      <form onSubmit={ onSubmitHandler }>
        <label htmlFor="email">
          E-mail
          { ' ' }
          <input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Senha
          { ' ' }
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
          />
        </label>
        <button
          type="submit"
          disabled={ isInvalidEmail || isInvalidPassword }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropType.shape({
    push: PropType.func.isRequired,
  }).isRequired,
};

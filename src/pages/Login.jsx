import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Login.css';
import crownIcon from '../images/coroa.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [isInvalidPassword, setIsInvalidPassword] = useState(true);
  const { setUserState } = useContext(RecipeContext);
  const history = useHistory();

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
    setUserState(email);
    history.push('foods');
  };

  return (
    <div className="text-center">
      <img className="crown" src={ crownIcon } alt="coroa" />
      <form onSubmit={ onSubmitHandler } className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">King of Recipes</h1>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
            className="form-control email-input"
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
            className="form-control password-input"
            placeholder="Senha"
          />
        </label>
        <button
          id="form-button"
          type="submit"
          disabled={ isInvalidEmail || isInvalidPassword }
          data-testid="login-submit-btn"
          className="btn btn-lg btn-danger btn-block form-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

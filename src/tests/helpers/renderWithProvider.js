import React, { useState } from 'react';
import PropType from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function MockProvider(props) {
  const {
    user: mockedUser = {
      email: '',
      tokens: { mealsToken: '1', cocktailsToken: '1' },
    },
    tokens: mockedTokens = {
      mealsToken: '1',
      cocktailsToken: '1',      
    },
    children,
  } = props;
  const [user, setUser] = useState(mockedUser);
  const [tokens, setTokens] = useState(mockedTokens);

  const setStoredUser = (storedUser) => setUser({ ...user, ...storedUser });
  const setStoredToken = (storedToken) => setTokens({ ...tokens, ...storedToken });

  return (
    <RecipeContext.Provider
      value={
        { user, setUser, setStoredToken, setStoredUser }
      }
    >
      { children }
    </RecipeContext.Provider>
  );
}

MockProvider.propTypes = {
  children: PropType.node.isRequired,
};

const statesDefault = {
  user: {
    email: '',
    tokens: { mealsToken: '1', cocktailsToken: '1' },
  }
}

function renderWithProvider(component, initialPath = '/', states = { ...statesDefault }) {
  const history = createMemoryHistory ({ initialEntries: [initialPath] });
  return {
    ...render(
      <Router history={ history }>
        <MockProvider { ...states }>
          { component }
        </MockProvider>
      </Router>,
    ),
    history,
  };
}

export default renderWithProvider;

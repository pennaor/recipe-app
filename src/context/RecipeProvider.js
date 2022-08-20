import React, { useState } from 'react';
import PropType from 'prop-types';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
  });

  const [tokens, setTokens] = useState({
    mealsToken: '1',
    cocktailsToken: '1',
  });

  const setStoredUser = (storedUser) => setUser({ ...user, ...storedUser });
  const setStoredToken = (storedToken) => setTokens({ ...tokens, ...storedToken });

  return (
    <RecipeContext.Provider value={ { user, setUser, setStoredToken, setStoredUser } }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropType.node.isRequired,
};

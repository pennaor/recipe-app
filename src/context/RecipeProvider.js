import React from 'react';
import PropType from 'prop-types';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  return (
    <RecipeContext.Provider value="">
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropType.node.isRequired,
};

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useChefManager from '../utils/useChefManager';

export default function DoRecipeButton({ recipe, ingredients }) {
  const history = useHistory();
  const { recipeStatus, updateRecipeStatus, startRecipe } = useChefManager();

  useEffect(() => {
    updateRecipeStatus(recipe);
  }, [recipe, updateRecipeStatus]);

  const doRecipe = () => {
    if (recipeStatus === 'Start Recipe') {
      startRecipe(ingredients);
    }
    history.push(`${history.location.pathname}/in-progress`);
  };

  return recipeStatus ? (
    <button
      type="button"
      onClick={ doRecipe }
      className="do-recipe-btn"
      data-testid="start-recipe-btn"
    >
      { recipeStatus }
    </button>
  ) : null;
}

DoRecipeButton.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({})),
};

DoRecipeButton.defaultProps = {
  ingredients: [],
};

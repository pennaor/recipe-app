import React from 'react';
import PropTypes from 'prop-types';

export default function DoRecipeButton({ chefManager }) {
  const {
    recipeStatus,
    startRecipe,
    continueRecipe,
  } = chefManager;

  const doRecipe = () => {
    if (recipeStatus === 'Start Recipe') {
      startRecipe();
    } else if (recipeStatus === 'Continue Recipe') {
      continueRecipe();
    }
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
  chefManager: PropTypes.shape({
    recipeStatus: PropTypes.string,
    startRecipe: PropTypes.func,
    continueRecipe: PropTypes.func,
  }).isRequired,
};

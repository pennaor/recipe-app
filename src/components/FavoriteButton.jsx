import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipe, useManager, testid }) {
  const { favoriteRecipes, updateFavoriteStatus } = useManager;
  const [favorite, setFavorite] = useState('');

  useEffect(() => {
    if (favoriteRecipes.some(({ id }) => (
      id === recipe.idMeal || id === recipe.idDrink || id === recipe.id))) {
      setFavorite(blackHeartIcon);
    } else {
      setFavorite(whiteHeartIcon);
    }
  }, [recipe, setFavorite, favoriteRecipes]);

  return favorite ? (
    <button
      type="button"
      onClick={ () => updateFavoriteStatus(recipe) }
    >
      <img
        data-testid={ testid }
        src={ favorite }
        alt="Favorite button"
      />
    </button>
  ) : null;
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  useManager: PropTypes.shape({
    favoriteRecipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateFavoriteStatus: PropTypes.func.isRequired,
  }).isRequired,
  testid: PropTypes.string,
};

FavoriteButton.defaultProps = {
  testid: 'favorite-btn',
};

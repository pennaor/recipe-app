import React from 'react';
import PropTypes from 'prop-types';
import DoRecipeButton from './DoRecipeButton';

export default function RecipeIngrendients({ recipe }) {
  const ingredients = [];
  const MAX_INGREDIENTS = 20;
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (!ingredient) {
      break;
    }
    ingredients.push({ ingredient, measure });
  }

  return ingredients.length ? (
    <>
      <div className="card ingredients-card">
        <h2
          className="card-header details-ingredients-title text-center"
        >
          Ingredients
        </h2>
        <ul
          className="list-group list-group-flush
      details-ingredients-list text-center"
        >
          { ingredients.map(({ ingredient, measure }, i) => (
            <li
              key={ ingredient }
              data-testid={ `${i}-ingredient-name-and-measure` }
              className="list-group-item"
            >
              {ingredient}
              {' '}
              -
              {' '}
              {measure}
            </li>)) }
        </ul>
      </div>
      <DoRecipeButton
        recipe={ recipe }
        ingredients={ ingredients }
      />
    </>
  ) : null;
}

RecipeIngrendients.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

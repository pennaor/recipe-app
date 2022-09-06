import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeIngrendients({ scratchOutIngredient, chefManager }) {
  const {
    ingredients,
    checkedIngredients,
  } = chefManager;

  return ingredients ? (
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
        { ingredients.map(({ ingredient, measure }, i) => {
          const isIngredientChecked = checkedIngredients.includes(ingredient);
          const text = `${ingredient} ${measure ? `- ${measure}` : ''}`;
          return (
            <li
              key={ ingredient }
              data-testid={ `${i}-ingredient-name-and-measure` }
              className="list-group-item"
            >
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ ingredient }
              >
                <input
                  className="checkbox"
                  type="checkbox"
                  hidden={ !scratchOutIngredient }
                  id={ ingredient }
                  value={ ingredient }
                  onClick={ scratchOutIngredient }
                  defaultChecked={ isIngredientChecked }
                />
                {' '}
                {
                  isIngredientChecked && scratchOutIngredient
                    ? <s>{ text }</s>
                    : text
                }
              </label>
            </li>
          );
        }) }
      </ul>
    </div>
  ) : null;
}

RecipeIngrendients.propTypes = {
  chefManager: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      ingredient: PropTypes.string,
      measure: PropTypes.string,
    })),
    checkedIngredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  scratchOutIngredient: PropTypes.func,
};

RecipeIngrendients.defaultProps = {
  scratchOutIngredient: null,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoRecipeButton from './DoRecipeButton';

export default function RecipeIngrendients({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const recepies = Object.entries(recipe[0]);
    setIngredients(recepies.filter(([key, value]) => (
      key.includes('strIngredient') && value)));
    setMeasure(recepies.filter(([key, value]) => (
      key.includes('strMeasure') && value)));
  }, [recipe]);

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
          { ingredients.map((ingredient, i) => (
            <li
              key={ ingredient }
              data-testid={ `${i}-ingredient-name-and-measure` }
              className="list-group-item"
            >
              {ingredient[1]}
              {' '}
              -
              {' '}
              {measure[i] && measure[i][1]}
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
  recipe: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

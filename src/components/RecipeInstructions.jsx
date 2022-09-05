import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeInstructions({ recipe }) {
  return (
    <div className="col-md-8 ingredients-card">
      <h2
        className="card-header details-ingredients-title text-center"
      >
        Instructions
      </h2>
      <div
        className="list-group list-group-item
        list-group-flush details-instructions"
      >
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>
      </div>
    </div>
  );
}

RecipeInstructions.propTypes = {
  recipe: PropTypes.shape({
    strInstructions: PropTypes.string,
  }).isRequired,
};

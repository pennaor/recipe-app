import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import linkCopied from '../utils/linkCopied';

export default function ShareButton({ recipe, testid }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={ () => {
        const url = `/${recipe.type}s/${recipe.id}`;
        linkCopied(url, setCopied);
      } }
    >
      { !copied ? (
        <img
          src={ shareIcon }
          alt="Share button"
          data-testid={ testid }
        />
      ) : (
        <span>Link copied!</span>
      ) }
    </button>
  );
}

ShareButton.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  testid: PropTypes.string.isRequired,
};

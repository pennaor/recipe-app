import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import linkCopied from '../utils/linkCopied';

export default function ShareButton({ url, testid }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="details-share-btn btn-outline-primary"
      onClick={ () => {
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
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    id: PropTypes.string,
  }),
  url: PropTypes.string,
  testid: PropTypes.string,
};

ShareButton.defaultProps = {
  recipe: {},
  url: '',
  testid: 'share-btn',
};

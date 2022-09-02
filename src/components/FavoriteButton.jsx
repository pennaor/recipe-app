import React from 'react';
import PropTypes from 'prop-types';

export default function FavoriteButton({ onClick, favorite, testid }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <img
        data-testid={ testid }
        src={ favorite }
        alt="Favorite button"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  onClick: PropTypes.func,
  favorite: PropTypes.string,
  testid: PropTypes.string,
};

FavoriteButton.defaultProps = {
  onClick: () => null,
  favorite: '',
  testid: 'favorite-btn',
};

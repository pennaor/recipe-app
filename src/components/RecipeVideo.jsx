import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeVideo({ url }) {
  return url ? (
    <>
      <h4>Video</h4>
      <iframe
        src={ `https://www.youtube.com/embed/${url.split('=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="details-recipe-video"
        data-testid="video"
      />
    </>
  ) : null;
}

RecipeVideo.propTypes = {
  url: PropTypes.string,
};

RecipeVideo.defaultProps = {
  url: null,
};

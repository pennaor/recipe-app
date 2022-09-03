import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Recommendations({ recommendations, type }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);
  const recommendationPairs = [];
  for (let i = 0; i < recommendations.length; i += 2) {
    recommendationPairs.push([{ ...recommendations[i] }, { ...recommendations[i + 1] }]);
  }

  return (
    <Carousel
      activeIndex={ index }
      onSelect={ handleSelect }
      prevLabel={ null }
      nextLabel={ null }
      indicators={ null }
      className="details-recomendations text-center"
      fade
    >
      { recommendationPairs.map(([first, last], i) => {
        const firstTestId = i + i;
        const lastTestId = firstTestId + 1;
        return (
          <CarouselItem
            key={ i }
            className=""
          >
            <div className="card details-recomendation-card">
              <Link to={ `${type}/${first.idDrink ?? first.idMeal}` }>
                <img
                  className="details-recomendations-recipe-photo left"
                  src={ first.strMealThumb || first.strDrinkThumb }
                  alt="recipe recomedations"
                  data-testid={ `${firstTestId}-recomendation-card` }
                />
                <span
                  data-testid={ `${firstTestId}-recomendation-title` }
                  className="details-recomendation-card-title"
                >
                  { first.strDrink || first.strMeal }
                </span>
              </Link>

            </div>

            <div className="card details-recomendation-card">
              <Link
                to={ `${type}/${last.idDrink ?? last.idMeal}` }
              >
                <img
                  className="details-recomendations-recipe-photo right"
                  src={ last.strMealThumb || last.strDrinkThumb }
                  alt="recipe recomedations"
                  data-testid={ `${lastTestId}-recomendation-card` }
                />
                <span
                  data-testid={ `${lastTestId}-recomendation-title` }
                  className="details-recomendation-card-title"
                >
                  { last.strDrink || last.strMeal }
                </span>
              </Link>

            </div>
          </CarouselItem>
        );
      }) }
    </Carousel>
  );
}

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.string.isRequired,
};

Recommendations.defaultProps = {
  recommendations: [{}],
};

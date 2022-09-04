import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import Loading from './Loading';

export default function Recommendations({ api: { api, key, routeTo } }) {
  const [index, setIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const RECOMENDATIONS_LEN = 6;
    fetchRecipe(api, '', 'name')
      .then((options) => {
        if (options[key] && options[key].length >= RECOMENDATIONS_LEN) {
          const optionsInPairs = [];
          for (let i = 0; i < RECOMENDATIONS_LEN; i += 2) {
            optionsInPairs.push([options[key][i], options[key][i + 1]]);
          }
          setRecommendations(optionsInPairs);
        }
      });
  }, [api, key, setRecommendations]);

  return (
    <>
      <h4>Recommendations</h4>
      { recommendations.length ? (
        <Carousel
          activeIndex={ index }
          onSelect={ (selectedIndex) => setIndex(selectedIndex) }
          className="details-recomendations text-center"
          prevLabel={ null }
          nextLabel={ null }
          indicators={ null }
          fade
        >
          { recommendations.map(([first, last], i) => {
            const firstTestId = i + i;
            const lastTestId = firstTestId + 1;
            return (
              <CarouselItem
                key={ i }
                className=""
              >
                <Link
                  to={
                    `${routeTo}
                    /${last.idDrink ?? last.idMeal}`
                  }
                >
                  <div className="card details-recomendation-card">
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

                  </div>
                </Link>
                <Link
                  to={
                    `${routeTo}
                    /${last.idDrink ?? last.idMeal}`
                  }
                >
                  <div className="card details-recomendation-card">

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

                  </div>
                </Link>
              </CarouselItem>
            );
          }) }
        </Carousel>
      ) : (
        <Loading />
      ) }
    </>
  );
}

Recommendations.propTypes = {
  api: PropTypes.shape({
    api: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    routeTo: PropTypes.string.isRequired,
  }).isRequired,
};

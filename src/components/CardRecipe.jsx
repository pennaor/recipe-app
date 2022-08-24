import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipe from '../services/fetchRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function CardRecipe(teste) {
  const [myRecipe, setMyRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [loading, setLoading] = useState(false);
  const { infos: { api, id } } = teste;

  useEffect(() => {
    const fetchMeal = async () => {
      const retorno = await fetchRecipe(api, id);
      const RECOMENDATIONS_LEN = 6;
      if (api === 'themealdb') {
        setMyRecipe(retorno.meals);
        const options = await fetchRecipe('thecocktaildb', '', 'name');
        if (options.drinks && options.drinks.length >= RECOMENDATIONS_LEN) {
          setRecomendations(options.drinks.slice(0, RECOMENDATIONS_LEN));
        }
      } else {
        setMyRecipe(retorno.drinks);
        const options = await fetchRecipe('themealdb', '', 'name');
        if (options.meals && options.meals.length >= RECOMENDATIONS_LEN) {
          setRecomendations(options.meals.slice(0, RECOMENDATIONS_LEN));
        }
      }
      setLoading(true);
    };
    fetchMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myRecipe.length > 0) {
      const recepies = Object.entries(myRecipe[0]);
      setIngredients(recepies.filter(([key, value]) => (
        key.includes('strIngredient') && value)));
      setMeasure(recepies.filter(([key, value]) => (
        key.includes('strMeasure') && value)));
    }
  }, [myRecipe]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Share button" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="Favorite button" />
      </button>
      {loading
        ? (
          <>
            <img
              width="200"
              src={ myRecipe[0].strMealThumb || myRecipe[0].strDrinkThumb }
              alt="Qualquer foto"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">
              { myRecipe[0].strMeal
            || myRecipe[0].strDrink}
            </h2>
            <h4 data-testid="recipe-category">
              { myRecipe[0].strAlcoholic || myRecipe[0].strCategory }
            </h4>
            <h2>Ingridients</h2>
            <ul>
              {loading && ingredients.map((ingredient, i) => (
                <li
                  key={ ingredient }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {ingredient[1]}
                  {' '}
                  -
                  {' '}
                  {measure[i][1]}
                </li>))}
            </ul>
            <p data-testid="instructions">
              {myRecipe[0].strInstructions}
            </p>
            <h2>Video</h2>
            {api === 'themealdb' && (
              <iframe
                data-testid="video"
                width="300"
                height="200"
                src={ `https://www.youtube.com/embed/${myRecipe[0].strYoutube.split('=')[1]}` }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;
              autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            <h2>Recommended</h2>
            <div
              style={ { overflow: 'auto', whiteSpace: 'nowrap', width: '300px' } }
            >
              { recomendations.map((option, i) => (
                <div
                  style={ {
                    width: '160px',
                    display: 'inline-block',
                    textAlign: 'center',
                  } }
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img
                    width="130"
                    src={ option.strMealThumb || option.strDrinkThumb }
                    alt="recipe recomedations"
                  />
                  <p
                    data-testid={ `${i}-recomendation-title` }
                  >
                    { option.strDrink || option.strMeal }
                  </p>
                </div>
              )) }
            </div>
          </>
        )
        : <i>Laoding...</i>}
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
      >
        Start Recipe
      </button>
    </div>
  );
}

CardRecipe.propTypes = {
  infos: PropTypes.object,
}.isRequired;

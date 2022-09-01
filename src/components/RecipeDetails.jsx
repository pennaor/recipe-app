import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import shareIcon from '../images/shareIcon.svg';
import linkCopied from '../utils/linkCopied';
import useFavoriteManager from '../utils/useFavoriteManager';
import useChefManager from '../utils/useChefManager';
import '../style/RecipeDetails.css';

export default function RecipeDetails(props) {
  const [myRecipe, setMyRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { infos: { api, id, url } } = props;

  const history = useHistory();
  const { favorite, updateFavoritedStatus, setFavoritedStatus } = useFavoriteManager();
  const { recipeStatus, updateRecipeStatus, startRecipe } = useChefManager();

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
      updateFavoritedStatus(myRecipe);
      updateRecipeStatus(myRecipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRecipe]);

  const doRecipe = () => {
    if (recipeStatus === 'Start Recipe') {
      startRecipe(ingredients);
    }
    history.push(`${history.location.pathname}/in-progress`);
  };

  return (
    <div className="recipe-details-container">
      {loading
        ? (
          <>
            <div className="card recipe-card">
              <img
                className="card-img-top recipe-photo"
                src={ myRecipe[0].strMealThumb || myRecipe[0].strDrinkThumb }
                alt="recipe"
              />
              <div className="card-body">
                <h5
                  className="card-title recipe-title text-center"
                  data-testid="recipe-title"
                >
                  { myRecipe[0].strMeal || myRecipe[0].strDrink }
                </h5>
                <h4 data-testid="recipe-category" className="card-text text-center">
                  { myRecipe[0].strAlcoholic || myRecipe[0].strCategory }
                </h4>
                <div>
                  <button
                    type="button"
                    onClick={ () => setFavoritedStatus(myRecipe) }
                    className=""
                  >
                    <img
                      data-testid="favorite-btn"
                      src={ favorite }
                      alt="Favorite button"
                    />
                  </button>
                  <button
                    type="button"
                    data-testid="share-btn"
                    onClick={ () => linkCopied(url, setCopied) }
                    className="share-btn btn-outline-primary"
                  >
                    <img src={ shareIcon } alt="Share button" />
                  </button>

                </div>
              </div>
            </div>
            {copied && <p style={ { display: 'block' } }>Link copied!</p>}
            <div className="col-md-3">
              <hr />
            </div>
            <div className="card ingredients-card">
              <h2 className="card-header ingredients-title text-center">Ingredients</h2>
              <ul className="list-group list-group-flush ingredients-list text-center">
                {loading && ingredients.map((ingredient, i) => (
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
                  </li>))}
              </ul>
            </div>
            <div className="col-md-8 ingredients-card">
              <h2 className="card-header ingredients-title text-center">Instructions</h2>
              <div
                className="list-group list-group-item
              list-group-flush ingredients-list text-center"
              >
                <p data-testid="instructions" className="instructions">
                  {myRecipe[0].strInstructions}
                </p>
              </div>
            </div>

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
              className="recommended"
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
        : <i>Loading...</i>}

      { recipeStatus && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
          onClick={ doRecipe }
        >
          { recipeStatus }
        </button>
      ) }

    </div>
  );
}

RecipeDetails.propTypes = {
  infos: PropTypes.object,
}.isRequired;

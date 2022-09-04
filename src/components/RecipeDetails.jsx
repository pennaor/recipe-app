import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipe from '../services/fetchRecipe';
import useFavoriteManager from '../utils/useFavoriteManager';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import '../style/RecipeDetails.css';
import Recommendations from './Recommendations';
import RecipeVideo from './RecipeVideo';
import Loading from './Loading';
import DoRecipeButton from './DoRecipeButton';

export default function RecipeDetails(props) {
  const [myRecipe, setMyRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [loading, setLoading] = useState(false);
  const { infos: { api, id, url } } = props;
  const { favorite, updateFavoritedStatus, setFavoritedStatus } = useFavoriteManager();

  useEffect(() => {
    const fetchMeal = async () => {
      const retorno = await fetchRecipe(api, id);
      if (api === 'themealdb') {
        setMyRecipe(retorno.meals);
      } else {
        setMyRecipe(retorno.drinks);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRecipe]);

  return loading ? (
    <div className="details-recipe-container">
      <div className="card details-recipe-card">
        <img
          className="card-img-top details-recipe-photo"
          src={ myRecipe[0].strMealThumb || myRecipe[0].strDrinkThumb }
          alt="recipe"
          data-testid="recipe-photo"
        />
        <div className="card-body">
          <h5
            className="card-title details-recipe-title text-center"
            data-testid="recipe-title"
          >
            { myRecipe[0].strMeal || myRecipe[0].strDrink }
          </h5>
          <h4 data-testid="recipe-category" className="card-text text-center">
            { myRecipe[0].strAlcoholic || myRecipe[0].strCategory }
          </h4>
          <div>
            <FavoriteButton
              onClick={ () => setFavoritedStatus(myRecipe) }
              favorite={ favorite }
            />
            <ShareButton
              url={ url }
              recipe={ myRecipe[0] }
            />
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <hr />
      </div>
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
            { myRecipe[0].strInstructions }
          </p>
        </div>
      </div>
      <RecipeVideo
        url={ myRecipe[0].strYoutube }
      />
      <Recommendations
        api={
          api.includes('themealdb')
            ? { api: 'thecocktaildb', key: 'drinks', routeTo: '/drinks' }
            : { api: 'themealdb', key: 'meals', routeTo: '/foods' }
        }
      />
      <DoRecipeButton
        recipe={ myRecipe }
        ingredients={ ingredients }
      />
    </div>
  ) : (
    <Loading />
  );
}

RecipeDetails.propTypes = {
  infos: PropTypes.object,
}.isRequired;

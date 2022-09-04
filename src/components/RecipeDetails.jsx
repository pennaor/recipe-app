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
import RecipeIngrendients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';

export default function RecipeDetails(props) {
  const [myRecipe, setMyRecipe] = useState([]);
  const { infos: { api, id, url } } = props;
  const { favorite, updateFavoritedStatus, setFavoritedStatus } = useFavoriteManager();

  useEffect(() => {
    const fetchMeal = async () => {
      const retorno = await fetchRecipe(api, id);
      if (api === 'themealdb') {
        setMyRecipe(retorno.meals);
        updateFavoritedStatus(retorno.meals);
      } else {
        setMyRecipe(retorno.drinks);
        updateFavoritedStatus(retorno.drinks);
      }
    };
    fetchMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return myRecipe.length ? (
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

      <RecipeIngrendients
        recipe={ myRecipe[0] }
      />
      <RecipeInstructions
        recipe={ myRecipe }
      />
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
    </div>
  ) : (
    <Loading />
  );
}

RecipeDetails.propTypes = {
  infos: PropTypes.object,
}.isRequired;

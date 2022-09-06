import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipe from '../services/fetchRecipe';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import '../style/RecipeDetails.css';
import Recommendations from './Recommendations';
import RecipeVideo from './RecipeVideo';
import Loading from './Loading';
import RecipeIngrendients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';
import useFavoriteManager from '../utils/useFavoriteManager';
import DoRecipeButton from './DoRecipeButton';
import useChefManager from '../utils/useChefManager';

export default function RecipeDetails(props) {
  const [myRecipe, setMyRecipe] = useState();
  const chefManager = useChefManager();
  const favoriteManager = useFavoriteManager();
  const { updateRecipeStatus } = chefManager;
  const { infos: { api, id, url } } = props;

  useEffect(() => {
    const fetchMeal = async () => {
      const retorno = await fetchRecipe(api, id);
      if (api === 'themealdb') {
        setMyRecipe(retorno.meals[0]);
      } else {
        setMyRecipe(retorno.drinks[0]);
      }
    };
    fetchMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myRecipe) {
      updateRecipeStatus(myRecipe);
    }
  }, [myRecipe, updateRecipeStatus]);

  return myRecipe ? (
    <div className="details-recipe-container">
      <div className="card details-recipe-card">
        <img
          className="card-img-top details-recipe-photo"
          src={ myRecipe.strMealThumb || myRecipe.strDrinkThumb }
          alt="recipe"
          data-testid="recipe-photo"
        />
        <div className="card-body">
          <h5
            className="card-title details-recipe-title text-center"
            data-testid="recipe-title"
          >
            { myRecipe.strMeal || myRecipe.strDrink }
          </h5>
          <h4 data-testid="recipe-category" className="card-text text-center">
            { myRecipe.strAlcoholic || myRecipe.strCategory }
          </h4>
          <div>
            <FavoriteButton
              recipe={ myRecipe }
              useManager={ favoriteManager }
            />
            <ShareButton
              url={ url }
              recipe={ myRecipe }
            />
          </div>
        </div>
      </div>

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <RecipeIngrendients
        recipe={ myRecipe }
        chefManager={ chefManager }
      />

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <RecipeInstructions
        recipe={ myRecipe }
      />

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <RecipeVideo
        url={ myRecipe.strYoutube }
      />

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <Recommendations
        api={
          api.includes('themealdb')
            ? { api: 'thecocktaildb', key: 'drinks', routeTo: '/drinks' }
            : { api: 'themealdb', key: 'meals', routeTo: '/foods' }
        }
      />

      <DoRecipeButton
        chefManager={ chefManager }
      />

    </div>
  ) : (
    <Loading />
  );
}

RecipeDetails.propTypes = {
  infos: PropTypes.object,
}.isRequired;

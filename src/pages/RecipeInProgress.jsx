import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import useFavoriteManager from '../utils/useFavoriteManager';
import '../style/Footer.css';
import '../style/RecipeInProgress.css';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Loading from '../components/Loading';
import RecipeIngrendients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import useChefManager from '../utils/useChefManager';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const chefManager = useChefManager();
  const {
    updateRecipeStatus,
    updateInProgressRecipes,
    ingredients,
    checkedIngredients,
    finishRecipe,
  } = chefManager;

  const { params: { id }, url } = useRouteMatch();
  const favoriteManager = useFavoriteManager();
  const api = url.includes('foods') ? 'themealdb'
    : 'thecocktaildb';

  // save infos:
  // const information = {
  //   image: recipe.strMealThumb,
  //   name: recipe.strMeal,
  //   category: recipe.strCategory,
  //   instructions: recipe.strInstructions,
  // };
  // if (typeFood === 'drinks') information.alcoholic = recipe.strAlcoholic;

  useEffect(() => {
    const getRecipesInformations = async (typeFood) => {
      const result = await fetchRecipe(api, id);
      setRecipe(result[typeFood][0]);
    };

    getRecipesInformations(api === 'themealdb' ? 'meals' : 'drinks');
  }, [api, id]);

  useEffect(() => {
    if (recipe) {
      updateRecipeStatus(recipe);
    }
  }, [recipe, updateRecipeStatus]);

  function scratchOutIngredient({ target: { value } }) {
    let scratchedIngredients = [];
    if (checkedIngredients.includes(value)) {
      scratchedIngredients = checkedIngredients.filter((e) => e !== value);
    } else {
      scratchedIngredients = [...checkedIngredients, value];
    }
    updateInProgressRecipes(scratchedIngredients);
  }

  return recipe ? (
    <div className="in-progress-recipe-container">
      <section className="card in-progress-recipe-card">
        <img
          className="card-img-top in-progress-recipe-photo"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="foto da receita finalizada"
          data-testid="recipe-photo"
        />
        <div className="card-body">
          <h5
            data-testid="recipe-title"
            className="card-title text-center in-progress-recipe-title"
          >
            { recipe.strMeal || recipe.strDrink }
          </h5>
          <h4 data-testid="recipe-category" className="card-text text-center">
            { recipe.strAlcoholic || recipe.strCategory }
          </h4>
          <div>
            <FavoriteButton
              recipe={ recipe }
              useManager={ favoriteManager }
            />
            <ShareButton
              recipe={ recipe }
              url={ url.replace(/\/in-progress$/, '') }
            />
          </div>
        </div>
      </section>

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <RecipeIngrendients
        chefManager={ chefManager }
        scratchOutIngredient={ (event) => scratchOutIngredient(event) }
      />

      <div className="col-10 col-lg-8">
        <hr />
      </div>

      <RecipeInstructions
        recipe={ recipe }
      />

      <button
        type="button"
        onClick={ finishRecipe }
        className="do-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={ ingredients && ingredients.length !== checkedIngredients.length }
      >
        Finish Recipe
      </button>

    </div>
  ) : (
    <Loading />
  );
}

export default RecipeInProgress;

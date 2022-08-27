import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import fetchRecipe from '../services/fetchRecipe';
import linkCopied from '../utils/linkCopied';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [informationFood, setInformationFood] = useState({});
  const [copied, setCopied] = useState(false);

  const { params: { id }, url } = useRouteMatch();
  const { inProgressRecipes } = useContext(RecipeContext);
  const history = useHistory();
  const typeRecipe = history.location.pathname.includes('foods') ? 'themealdb'
    : 'thecocktaildb';

  function getIngredients(obj) {
    const keysIngred = Object.keys(obj).filter((e) => e.includes('strIngredient'));
    const keysMeasures = Object.keys(obj).filter((e) => e.includes('strMeasure'));

    const ingredientsObj = keysIngred.map((key) => obj[key]);
    const measuresObj = keysMeasures.map((key) => obj[key]);

    let ingredFiltred = {};
    let measuresFiltred = {};
    if (typeRecipe === 'themealdb') {
      ingredFiltred = ingredientsObj.filter((e) => e.length > 0);
      measuresFiltred = measuresObj.filter((e) => e.length > 0);
    } else {
      ingredFiltred = ingredientsObj.filter((e) => e !== null);
      measuresFiltred = measuresObj.filter((e) => e !== null);
    }

    const ingredMeas = ingredFiltred.map((e, i) => e = `${e} - ${measuresFiltred[i]}`);
    setIngredients(ingredMeas);

    /* console.log(ingredFiltred);
    console.log(measuresFiltred);
    console.log(ingredMeas); */
  }

  const getInformationsMeals = async () => {
    const typeFood = 'meals';
    const resultArray = await fetchRecipe(typeRecipe, id);
    const resultObj = resultArray[typeFood][0];
    console.log(resultObj);
    setInformationFood({
      image: resultObj.strMealThumb,
      name: resultObj.strMeal,
      category: resultObj.strCategory,
      instructions: resultObj.strInstructions,
    });
    getIngredients(resultObj);
  };

  const getInformationsDrinks = async () => {
    const typeFood = 'drinks';
    const resultArray = await fetchRecipe(typeRecipe, id);
    const resultObj = resultArray[typeFood][0];
    console.log(resultObj);
    setInformationFood({
      image: resultObj.strDrinkThumb,
      name: resultObj.strDrink,
      category: resultObj.strCategory,
      instructions: resultObj.strInstructions,
      alcoholic: resultObj.strAlcoholic,
    });
    getIngredients(resultObj);
  };

  useEffect(() => {
    console.log(url);

    if (typeRecipe === 'themealdb') {
      getInformationsMeals();
    } else {
      getInformationsDrinks();
    }
  }, []);

  function mostrarDados() {
    console.log(inProgressRecipes);
    console.log(typeRecipe);
    console.log(id);
  }

  return (
    <div>
      <img
        src={ informationFood.image }
        alt="foto da receita finalizada"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { informationFood.name }
      </h1>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => linkCopied(url, setCopied) }
      >
        <img
          src={ shareIcon }
          alt="iconde de compartilhar"
        />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      /* onClick={  } */
      >
        <img
          src={ whiteHeartIcon }
          alt="icone de favoritar"
        />
      </button>

      {copied && <p>Link copied!</p>}

      <h4 data-testid="recipe-category">{informationFood.category}</h4>

      <h5>Ingredients:</h5>

      {
        ingredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ index }
          >
            <input
              data-testid={ `${index}-ingredient-step` }
              id={ index }
              type="checkbox"
              /* onChange={ } */
            />
            { ingredient }
          </div>
        ))
      }

      <p data-testid="instructions">
        { informationFood.instructions }
      </p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => mostrarDados() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

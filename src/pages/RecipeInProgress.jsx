import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import fetchRecipe from '../services/fetchRecipe';
import linkCopied from '../utils/linkCopied';
import useChefManager from '../utils/useChefManager';
import useFavoriteManager from '../utils/useFavoriteManager';

import '../style/Footer.css';
import '../style/RecipeInProgress.css';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsConcluid, setIngredientsConluid] = useState([]);
  const [informationFood, setInformationFood] = useState({});
  const [copied, setCopied] = useState(false);
  const [myRecipe, SetMyRecipe] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { params: { id }, url } = useRouteMatch();
  const { favorite, updateFavoritedStatus, setFavoritedStatus } = useFavoriteManager();
  const { inProgressRecipes } = useChefManager();
  const history = useHistory();
  const typeRecipe = history.location.pathname.includes('foods') ? 'themealdb'
    : 'thecocktaildb';

  function enableBtnFinish() {
    const lengthIngred = ingredients.length - 1;
    const lengthIngredConluid = ingredientsConcluid.length;
    if (lengthIngred === lengthIngredConluid) {
      setBtnDisabled(false);
    }
  }

  function getIngredients(obj) {
    const keysIngred = Object.keys(obj).filter((e) => e.includes('strIngredient'));
    const keysMeasures = Object.keys(obj).filter((e) => e.includes('strMeasure'));

    const ingredientsObj = keysIngred.map((key) => obj[key]);
    const measuresObj = keysMeasures.map((key) => obj[key]);

    let ingredFiltred = {};
    let measuresFiltred = {};
    if (typeRecipe === 'themealdb') {
      ingredFiltred = ingredientsObj.filter((e) => e && e.length > 0);
      measuresFiltred = measuresObj.filter((e) => e && e.length > 0);
    } else {
      ingredFiltred = ingredientsObj.filter((e) => !!e);
      measuresFiltred = measuresObj.filter((e) => !!e);
    }

    const ingredMeas = ingredFiltred.map((e, i) => `${e} - ${measuresFiltred[i]}`);
    setIngredients(ingredMeas);
  }

  const getInformationsMeals = async () => {
    const typeFood = 'meals';
    const resultArray = await fetchRecipe(typeRecipe, id);
    const resultObj = resultArray[typeFood][0];
    setInformationFood({
      image: resultObj.strMealThumb,
      name: resultObj.strMeal,
      category: resultObj.strCategory,
      instructions: resultObj.strInstructions,
    });
    getIngredients(resultObj);
    SetMyRecipe(resultArray[typeFood]);
    updateFavoritedStatus(resultArray[typeFood]);
  };

  const getInformationsDrinks = async () => {
    const typeFood = 'drinks';
    const resultArray = await fetchRecipe(typeRecipe, id);
    const resultObj = resultArray[typeFood][0];
    setInformationFood({
      image: resultObj.strDrinkThumb,
      name: resultObj.strDrink,
      category: resultObj.strCategory,
      instructions: resultObj.strInstructions,
      alcoholic: resultObj.strAlcoholic,
    });
    getIngredients(resultObj);
    SetMyRecipe(resultArray[typeFood]);
    updateFavoritedStatus(resultArray[typeFood]);
  };

  useEffect(() => { // componentDidMount
    if (typeRecipe === 'themealdb') {
      getInformationsMeals();
    } else {
      getInformationsDrinks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scratchOutIngredient({ target }) { // Necessário refatorar a função
    const { value } = target;
    if (ingredientsConcluid.includes(value)) {
      const newlistIngredients = ingredientsConcluid.filter((e) => e !== value);
      setIngredientsConluid(newlistIngredients);
      console.log(btnDisabled);
    } else {
      setIngredientsConluid([...ingredientsConcluid, value]);
      console.log(btnDisabled);
    }
    enableBtnFinish();
  }

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
        onClick={ () => linkCopied(url.replace(/\/in-progress$/, ''), setCopied) }
      >
        <img
          src={ shareIcon }
          alt="iconde de compartilhar"
        />
      </button>

      <button
        type="button"
        onClick={ () => setFavoritedStatus(myRecipe) }
      >
        <img
          src={ favorite }
          alt="icone de favoritar"
          data-testid="favorite-btn"
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
              id={ index }
              value={ ingredient }
              type="checkbox"
              onChange={ (e) => scratchOutIngredient(e) }
            />
            { ingredientsConcluid.includes(ingredient)
              ? <span><s>{ ingredient }</s></span>
              : <span>{ ingredient }</span> }
          </div>
        ))
      }

      <p data-testid="instructions">
        { informationFood.instructions }
      </p>

      <button
        className="button-finish"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => mostrarDados() }
        disabled={ btnDisabled } // requisito 42
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

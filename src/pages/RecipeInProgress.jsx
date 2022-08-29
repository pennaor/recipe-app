import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchRecipe from '../services/fetchRecipe';
import linkCopied from '../utils/linkCopied';
import favoriteRecipe from '../utils/favoriteRecipe';

import '../style/footerStyle.css';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsConcluid, setIngredientsConluid] = useState([]);
  const [informationFood, setInformationFood] = useState({});
  const [copied, setCopied] = useState(false);
  const [myRecipe, SetMyRecipe] = useState([]);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { params: { id }, url } = useRouteMatch();
  const { inProgressRecipes } = useContext(RecipeContext);
  const history = useHistory();
  const typeRecipe = history.location.pathname.includes('foods') ? 'themealdb'
    : 'thecocktaildb';

  function enableBtnFinish() {
    const lengthIngred = ingredients.length;
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
      ingredFiltred = ingredientsObj.filter((e) => e.length > 0);
      measuresFiltred = measuresObj.filter((e) => e.length > 0);
    } else {
      ingredFiltred = ingredientsObj.filter((e) => e !== null);
      measuresFiltred = measuresObj.filter((e) => e !== null);
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
    } else {
      setIngredientsConluid([...ingredientsConcluid, value]);
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
        onClick={ () => favoriteRecipe(myRecipe, id, favoriteIcon, setFavoriteIcon) }
      >
        <img
          src={ favoriteIcon }
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
        disabled={ btnDisabled }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import useChefManager from '../utils/useChefManager';
import useFavoriteManager from '../utils/useFavoriteManager';

import '../style/Footer.css';
import '../style/RecipeInProgress.css';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsConcluid, setIngredientsConluid] = useState([]);
  const [informationFood, setInformationFood] = useState({});
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
    } else {
      setBtnDisabled(true);
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

  function scratchOutIngredient({ target: { value } }) { // Necessário refatorar a função
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
    <div className="in-progress-recipe-container">
      <section className="card in-progress-recipe-card">
        <img
          className="card-img-top in-progress-recipe-photo"
          src={ informationFood.image }
          alt="foto da receita finalizada"
          data-testid="recipe-photo"
        />
        <div className="card-body">
          <h5
            data-testid="recipe-title"
            className="card-title text-center in-progress-recipe-title"
          >
            { informationFood.name }
          </h5>
          <h4 data-testid="recipe-category" className="card-text text-center">
            {
              informationFood.category
            }
          </h4>
          <div>
            <FavoriteButton
              onClick={ () => setFavoritedStatus(myRecipe) }
              favorite={ favorite }
            />
            <ShareButton
              url={ url.replace(/\/in-progress$/, '') }
              recipe={ myRecipe[0] }
            />
          </div>
        </div>
      </section>

      <section className="ingredients-card card">
        <h4 className="card-header ingredients-title text-center">Ingredients</h4>
        <div
          className="list-group list-group-flush ingredients-list"
        >
          {
            ingredients.map((ingredient, index) => (
              <label
                className="ingredients-list list-group-item"
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ index }
                style={ { padding: '10px' } }
              >
                <input
                  className="checkbox"
                  id={ index }
                  value={ ingredient }
                  type="checkbox"
                  onChange={ (e) => scratchOutIngredient(e) }
                />
                {' '}
                { ingredientsConcluid.includes(ingredient)
                  ? <span><s>{ ingredient }</s></span>
                  : <span>{ ingredient }</span> }
              </label>
            ))
          }
        </div>
      </section>

      <p data-testid="instructions" className="instructions">
        { informationFood.instructions }
      </p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => mostrarDados() }
        disabled={ btnDisabled }
        style={ {
          position: 'fixed',
          bottom: '7px',
          width: '15em',
          height: '2.5em',
        } }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

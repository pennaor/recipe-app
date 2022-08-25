import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [ingredients, setIngradients] = useState([]);
  const [informationFood, setInformationFood] = useState([]);

  const { id } = useParams();
  const { inProgressRecipes } = useContext(RecipeContext);
  const history = useHistory();
  const typeRecipe = history.location.pathname.includes('foods') ? 'meals' : 'cocktails';

  function mostrarDados() {
    console.log(history);
    console.log(inProgressRecipes);
    console.log(typeRecipe);
    console.log(id);
  }

  const getInformationFoods = async () => {
    
  }

  return (
    <div>
      {/* <img
        src={  }
        alt="foto da receita finalizada"
        data-testid="recipe-photo"
      /> */}
      <h1
        data-testid="recipe-title"
      >
        Botar aqui o titulo da receita
      </h1>

      <button
        type="button"
        data-testid="share-btn"
        /* onClick={  } */
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

      <h4 data-testid="recipe-category">Texto da cetegoria</h4>

      <p>Ingredients</p>

      <li>
        <input
          /* data-testid={ `${ind}-ingredient-step` } */
          type="checkbox"
          name="mudarDepois"
          value="mudarDepois"
          /* onChange={ } */
        />
      </li>

      <p data-testid="instructions">
        Botar aqui as instruções da receita
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

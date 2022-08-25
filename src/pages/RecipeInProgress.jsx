import React from 'react';
import { useParams } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();

  return (
    <div>
      <img
        src={ foto da receita }
        alt="foto da receita finalizada"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
       { Nome da receita }
      </h1>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ ação de compartilhar }
      >
        <img
          src={ shareIcon }
          alt="iconde de compartilhar"
        />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ ação de favoritar }
      >
  <img
    src={whiteHeartIcon}
    alt="icone de favoritar"
  />
      </button >

      <h4 data-testid="recipe-category">Texto da cetegoria</h4>

      <p>Ingredients</p>

{ Fazer um map e imprimir na lista abaixo }
      <li>
        <input
          data-testid={ `${ind}-ingredient-step` }
          type="checkbox"
          name="mudarDepois"
          value="mudarDepois"
          onChange={ ação de riscar o item listado }
        />
      </li>

      <p data-testid="instructions">
        { Instruções da receita renderizada }
      </p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div >
  );
}

export default RecipeInProgress;

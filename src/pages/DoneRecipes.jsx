import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { oneMeal, oneDrink } from '../tests/helpers/mockData/oneMealNDrinkDoneRecipe';

export default function DoneRecipes() {
  const [cardsFinishedMock, setCardsFinishedMock] = useState([]);

  useEffect(() => {
    setCardsFinishedMock([oneMeal, oneDrink]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneMeal, oneDrink]);

  const keyCurr = [];

  return (
    <div>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        cardsFinishedMock.map((card, index) => {
          keyCurr.push(Object.keys(card));
          const verificateTags = card[keyCurr[index][0] === 'meals'
            ? 'meals' : 'drinks'][0].strTags;
          // Estudando regex no site regexone e testando no regex101.
          // O match eu procurei na documentação sobre Regex, quais funções podem ser usada com regex
          const tags = verificateTags && verificateTags.match(/\w*[^\W]/gm);

          return (
            <div
              key={ keyCurr[index][0] === 'meals'
                ? card[keyCurr[index][0]][0].strMealThumb
                : card[keyCurr[index][0]][0].strDrinkThumb }
            >
              <img
                src={ keyCurr[index][0] === 'meals'
                  ? card[keyCurr[index][0]][0].strMealThumb
                  : card[keyCurr[index][0]][0].strDrinkThumb }
                alt={ keyCurr[index][0] === 'meals'
                  ? card[keyCurr[index][0]][0].strMeal
                  : card[keyCurr[index][0]][0].strDrink }
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-top-text` }>{card.strCategory}</p>

              <p data-testid={ `${index}-horizontal-name` }>
                { keyCurr[index][0] === 'meals'
                  ? card[keyCurr[index][0]][0].strMeal
                  : card[keyCurr[index][0]][0].strDrink }

              </p>

              <p data-testid={ `${index}-horizontal-done-date` }>08/25/2022</p>

              <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                <img src={ shareIcon } alt="compartilhar" />
              </button>

              { tags && tags.map((tag, i) => (
                <p
                  key={ `${tag}${index}${i}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}

            </div>
          );
        })
      }
    </div>
  );
}

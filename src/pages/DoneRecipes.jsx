import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { oneMeal, oneDrink } from '../tests/helpers/mockData/oneMealNDrinkDoneRecipe';
import linkCopied from '../utils/linkCopied';

export default function DoneRecipes() {
  const [cardsFinishedMock, setCardsFinishedMock] = useState([]);
  const [copied, setCopied] = useState(false);

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
          const mealOrDrink = keyCurr[index][0];
          const verificateTags = card[mealOrDrink === 'meals'
            ? 'meals' : 'drinks'][0].strTags;
          // Estudando regex no site regexone e testando no regex101.
          // O match eu procurei na documentação sobre Regex, quais funções podem ser usada com regex
          const TWO = 2;
          const tags = verificateTags && verificateTags.match(/\w*[^\W]/gm)
            .filter((_e, i) => i < TWO);

          return (
            <div
              key={ mealOrDrink === 'meals'
                ? card[mealOrDrink][0].strMealThumb
                : card[mealOrDrink][0].strDrinkThumb }
            >
              <img
                src={ mealOrDrink === 'meals'
                  ? card[mealOrDrink][0].strMealThumb
                  : card[mealOrDrink][0].strDrinkThumb }
                alt={ mealOrDrink === 'meals'
                  ? card[mealOrDrink][0].strMeal
                  : card[mealOrDrink][0].strDrink }
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-name` }>
                { mealOrDrink === 'meals'
                  ? card[mealOrDrink][0].strMeal
                  : card[mealOrDrink][0].strDrink }

              </p>

              {
                mealOrDrink !== 'meals' && (
                  <p
                    data-testid={
                      `${index}-horizontal-top-text`
                    }
                  >
                    {card[mealOrDrink][0].strCategory}
                  </p>
                )
              }

              {
                mealOrDrink === 'drinks' && (
                  <p
                    data-testid={
                      `${index}-horizontal-top-text`
                    }
                  >
                    {card[mealOrDrink][0].strAlcoholic}
                  </p>
                )
              }

              {
                mealOrDrink === 'meals' && (
                  <p
                    data-testid={
                      `${index}-horizontal-top-text`
                    }
                  >
                    {`${card[mealOrDrink][0]
                      .strArea} - ${card[mealOrDrink][0].strCategory} `}
                  </p>
                )
              }
              {/* data mockada esperando os requisitos da página anterior */}
              <p data-testid={ `${index}-horizontal-done-date` }>23/06/2020</p>

              { tags && tags.map((tag, i) => (
                <p
                  key={ `${tag}${index}${i}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}

              <button
                onClick={ () => (mealOrDrink === 'meals' ? (
                  linkCopied(`/foods/${card[mealOrDrink][0].idMeal}`, setCopied)
                ) : (
                  linkCopied(`/drinks/${card[mealOrDrink][0].idDrink}`, setCopied)
                )) }
                type="button"
              >
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>

              {copied && <p style={ { display: 'block' } }>Link copied!</p>}

            </div>
          );
        })
      }
    </div>
  );
}

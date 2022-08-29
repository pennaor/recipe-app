import React from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import useChefManager from '../utils/useChefManager';

export default function DoneRecipes() {
  const { doneRecipes } = useChefManager();

  return (
    <div>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        doneRecipes.map((card, index) => (
          <div
            key={ card.image }
          >
            <img
              src={ card.image }
              alt={ `recipe of ${card.name}` }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>
              { card.name }
            </p>
            {
              card.type === 'food' && (
                <p
                  data-testid={
                    `${index}-horizontal-top-text`
                  }
                >
                  {`${card.nationality} - ${card.category}`}
                </p>
              )
            }
            {
              card.type === 'drink' && (
                <p
                  data-testid={
                    `${index}-horizontal-top-text`
                  }
                >
                  {card.alcoholicOrNot}
                </p>
              )
            }
            <p data-testid={ `${index}-horizontal-done-date` }>{ card.doneDate }</p>

            { card.tags.map((tag, i) => (
              <p
                key={ `${tag}${index}${i}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}

            <ShareButton
              recipe={ card }
              testid={ `${index}-horizontal-share-btn` }
            />

          </div>
        ))
      }
    </div>
  );
}

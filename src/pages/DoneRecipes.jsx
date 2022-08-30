import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import useChefManager from '../utils/useChefManager';

export default function DoneRecipes() {
  const { doneRecipes } = useChefManager();
  const [btnFoodOrDrink, setBtnFoodOrDrink] = useState('');

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setBtnFoodOrDrink((prev) => (prev === 'food'
          || prev === 'drink' ? '' : prev)) }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setBtnFoodOrDrink((prev) => (prev === ''
          || prev === 'drink' ? 'food' : '')) }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setBtnFoodOrDrink((prev) => (prev === '' || prev === 'food'
            ? 'drink' : '')) }
        >
          Drinks

        </button>
      </div>
      {
        doneRecipes.filter((e) => e.type.includes(btnFoodOrDrink)).map((card, index) => (
          <div
            key={ card.image }
          >
            <Link
              to={ `/${card.type}s/${card.id}` }
            >
              <img
                src={ card.image }
                alt={ `recipe of ${card.name}` }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '200px' } }
              />
              <p data-testid={ `${index}-horizontal-name` }>
                { card.name }
              </p>
            </Link>
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

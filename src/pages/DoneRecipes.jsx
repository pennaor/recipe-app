import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import useChefManager from '../hooks/useChefManager';
import '../style/DoneRecipes.css';

export default function DoneRecipes() {
  const { doneRecipes } = useChefManager();
  const [btnFoodOrDrink, setBtnFoodOrDrink] = useState('');

  return (
    <>
      <Header />
      <div className="done-recipes-container">
        <div className="done-recipes-categorys">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setBtnFoodOrDrink((prev) => (prev === 'food'
            || prev === 'drink' ? '' : prev)) }
            className="btn btn-sm btn-outline-danger done-recipes-category-button"
          >
            All

          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setBtnFoodOrDrink((prev) => (prev === ''
            || prev === 'drink' ? 'food' : '')) }
            className="btn btn-sm btn-outline-danger done-recipes-category-button"
          >
            Food

          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setBtnFoodOrDrink((prev) => (prev === '' || prev === 'food'
              ? 'drink' : '')) }
            className="btn btn-sm btn-outline-danger done-recipes-category-button"
          >
            Drinks

          </button>
        </div>
        <div className="done-recipes-divider">
          <hr className="done-recipes-divider-categorys" />
        </div>
        <div className="done-recipes-cards-container">
          {
            doneRecipes
              .filter((e) => e.type.includes(btnFoodOrDrink))
              .map((card, index) => (
                <div
                  key={ card.image }
                  className="done-recipes-recipe-card"
                >
                  <Link
                    to={ `/${card.type}s/${card.id}` }
                  >
                    <img
                      src={ card.image }
                      alt={ `recipe of ${card.name}` }
                      data-testid={ `${index}-horizontal-image` }
                      className="done-recipes-recipe-photo"
                    />
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                      className="text-center done-recipes-recipe-title"
                    >
                      { card.name }
                    </h4>
                  </Link>

                  <div className="done-recipes-divider">
                    <hr className="done-recipes-divider-hr" />
                  </div>

                  {
                    card.type === 'food' && (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${card.nationality} - ${card.category}`}
                      </p>
                    )
                  }
                  {
                    card.type === 'drink' && (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { card.alcoholicOrNot }
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
                    url={ `/${card.type}s/${card.id}` }
                    testid={ `${index}-horizontal-share-btn` }
                  />
                </div>
              ))
          }
        </div>
      </div>
    </>
  );
}

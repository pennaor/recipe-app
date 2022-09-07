import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFavoriteManager from '../hooks/useFavoriteManager';
import useChefManager from '../hooks/useChefManager';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../style/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const favoriteManager = useFavoriteManager();
  const { doneRecipes } = useChefManager();
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <>
      <Header />
      <div className="favorite-recipes-container">
        <div className="favorite-recipes-categorys">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setActiveFilter('all') }
            className="btn btn-sm btn-outline-danger favorite-recipes-category-button"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setActiveFilter('drink') }
            className="btn btn-sm btn-outline-danger favorite-recipes-category-button"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setActiveFilter('food') }
            className="btn btn-sm btn-outline-danger favorite-recipes-category-button"
          >
            Drinks
          </button>
        </div>
        <div className="favorite-recipes-divider">
          <hr className="favorite-recipes-divider-categorys" />
        </div>
        <div className="favorite-recipes-cards-container">
          { favoriteManager.favoriteRecipes
            .filter(({ type }) => type !== activeFilter)
            .map((recipe, index) => {
              const doneRecipe = doneRecipes.find(
                ({ type, id }) => (recipe.type === type && recipe.id === id),
              );
              return (
                <div key={ recipe.name } className="favorite-recipes-recipe-card">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ `recipe of ${recipe.name}` }
                      className="favorite-recipes-recipe-photo"
                    />
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                      className="text-center favorite-recipes-recipe-title"
                    >
                      { recipe.name }
                    </h4>
                  </Link>

                  <div className="favorite-recipes-divider">
                    <hr className="favorite-recipes-divider-hr" />
                  </div>

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot
                      || `${recipe.nationality} - ${recipe.category}` }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    { doneRecipe && doneRecipe.doneDate }
                  </p>
                  { doneRecipe && doneRecipe.tags.map((tag) => (
                    <p
                      key={ `${index}-${tag}-horizontal-tag` }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </p>
                  )) }
                  <div>
                    <FavoriteButton
                      recipe={ recipe }
                      useManager={ favoriteManager }
                      testid={ `${index}-horizontal-favorite-btn` }
                    />
                    <ShareButton
                      url={ `/${recipe.type}s/${recipe.id}` }
                      testid={ `${index}-horizontal-share-btn` }
                    />
                  </div>
                </div>
              );
            }) }
        </div>
      </div>
    </>
  );
}

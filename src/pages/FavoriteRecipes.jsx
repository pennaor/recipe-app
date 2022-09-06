import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFavoriteManager from '../hooks/useFavoriteManager';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../style/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const favoriteManager = useFavoriteManager();
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <>
      <Header />
      <div className="favorite-recipes">
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setActiveFilter('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setActiveFilter('drink') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setActiveFilter('food') }
          >
            Drinks
          </button>
        </div>
        <div>
          { favoriteManager.favoriteRecipes
            .filter(({ type }) => type !== activeFilter)
            .map((recipe, index) => (
              <div key={ recipe.name }>
                <div>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ `recipe of ${recipe.name}` }
                      width="100px"
                    />
                  </Link>
                </div>

                <div>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot
                      || `${recipe.nationality} - ${recipe.category}` }
                  </p>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>
                      { recipe.name }
                    </p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Data
                  </p>
                </div>

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
                  <span
                    data-testid={ `${index}-${''}-horizontal-tag` }
                  >
                    Tag
                  </span>
                </div>

              </div>
            )) }
        </div>
      </div>
    </>
  );
}

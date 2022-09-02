import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavoriteManager from '../utils/useFavoriteManager';
import '../style/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const { favoriteRecipes, setFavoritedStatus } = useFavoriteManager();
  const [recipesToRender, setRecipesToRender] = useState([...favoriteRecipes]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const result = favoriteRecipes.filter(({ type }) => type !== activeFilter);
    setRecipesToRender(result);
  }, [favoriteRecipes, activeFilter, setRecipesToRender]);

  return (
    <div className="favorite-recipes">
      <Header />
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
        { recipesToRender.map((recipe, index) => (
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
                onClick={ () => setFavoritedStatus([recipe]) }
                testid={ `${index}-horizontal-favorite-btn` }
                favorite={ blackHeartIcon }
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
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavoriteManager from '../utils/useFavoriteManager';
import RecipeContext from '../context/RecipeContext';

export default function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(RecipeContext);
  const [recipesToRender, setRecipesToRender] = useState([...favoriteRecipes]);
  const [activeFilter, setActiveFilter] = useState('all');

  const { setFavoritedStatus } = useFavoriteManager();
  useEffect(() => {
    const result = favoriteRecipes.filter(({ type }) => type !== activeFilter);
    setRecipesToRender(result);
  }, [favoriteRecipes, activeFilter, setRecipesToRender]);

  return (
    <div>
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
              <button
                type="button"
                onClick={ () => setFavoritedStatus([recipe]) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="unfavorite button"
                />
              </button>
              <ShareButton
                recipe={ recipe }
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

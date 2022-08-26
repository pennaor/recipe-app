import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import linkCopied from '../utils/linkCopied';

export default function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [favoriteRecipesMOCK, setFavoriteRecipesMOCK] = useState([
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ]);
  const [recipesToRender, setRecipesToRender] = useState([...favoriteRecipesMOCK]);
  const [activeFilter, setActiveFilter] = useState('all');

  const onUnfavoriteRecipe = (imgSrc) => {
    const newFavorites = favoriteRecipesMOCK.filter(({ image }) => image !== imgSrc);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipesMOCK(newFavorites);
  };

  useEffect(() => {
    setRecipesToRender(favoriteRecipesMOCK.filter(({ type }) => type !== activeFilter));
  }, [favoriteRecipesMOCK, activeFilter, setRecipesToRender]);

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
                  alt="recipePhoto"
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
                onClick={ () => onUnfavoriteRecipe(recipe.image) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="unfavorite button"
                />
              </button>
              <button
                type="button"
                onClick={ () => {
                  const url = `/${recipe.type}s/${recipe.id}`;
                  linkCopied(url, setCopied);
                } }
              >
                { !copied ? (
                  <img
                    src={ shareIcon }
                    alt="Share button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                ) : (
                  <span>Link copied!</span>
                ) }
              </button>
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

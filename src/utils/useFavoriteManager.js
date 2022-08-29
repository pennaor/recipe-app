import { useState, useEffect } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const favoriteObject = (myRecipe) => ({
  id: myRecipe[0].idMeal ?? myRecipe[0].idDrink,
  type: myRecipe[0].strMeal ? 'food' : 'drink',
  nationality: myRecipe[0].strArea || '',
  category: myRecipe[0].strCategory,
  alcoholicOrNot: myRecipe[0].strAlcoholic ? 'Alcoholic' : '',
  name: myRecipe[0].strMeal || myRecipe[0].strDrink,
  image: myRecipe[0].strMealThumb || myRecipe[0].strDrinkThumb,
});

export default function useFavoriteManager() {
  const [recipe, saveRecipe] = useState([]);
  const [favorite, setFavorite] = useState();
  const [parseFavorites, setParseFavorites] = useState(false);

  const [
    favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')) ?? []);

  useEffect(() => {
    const likedRecipe = () => {
      if (favoriteRecipes.some(({ id }) => (
        id === recipe[0].idMeal || id === recipe[0].idDrink || recipe[0].id))) {
        setFavorite(blackHeartIcon);
      } else {
        setFavorite(whiteHeartIcon);
      }
    };

    if (recipe.length) likedRecipe();
  }, [recipe, favoriteRecipes]);

  useEffect(() => {
    const unFavoriteRecipe = (json) => json.filter(({ id: idRecipe }) => {
      const idToRemove = recipe[0].id ?? recipe[0].idMeal ?? recipe[0].idDrink;
      return idRecipe !== idToRemove;
    });
    const favoriteRecipe = (json) => {
      if (!json) return [favoriteObject(recipe)];
      return [...json, favoriteObject(recipe)];
    };

    if (parseFavorites) {
      setParseFavorites(false);
      let updatedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favorite === whiteHeartIcon) {
        updatedRecipes = favoriteRecipe(updatedRecipes);
      } else {
        updatedRecipes = unFavoriteRecipe(updatedRecipes);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      setFavoriteRecipes(updatedRecipes);
    }
  }, [setFavoriteRecipes, favorite, recipe, parseFavorites]);

  const updateFavoritedStatus = (recipeToCheck) => saveRecipe(recipeToCheck);
  const setFavoritedStatus = (recipeToChange) => {
    updateFavoritedStatus(recipeToChange);
    setParseFavorites(true);
  };

  return { favorite, updateFavoritedStatus, favoriteRecipes, setFavoritedStatus };
}

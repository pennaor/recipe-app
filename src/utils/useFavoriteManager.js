import { useCallback, useState } from 'react';

const favoriteObject = (myRecipe) => ({
  id: myRecipe.idMeal ?? myRecipe.idDrink ?? myRecipe.id,
  type: myRecipe.strMeal ? 'food' : 'drink',
  nationality: myRecipe.strArea || '',
  category: myRecipe.strCategory,
  alcoholicOrNot: myRecipe.strAlcoholic ? 'Alcoholic' : '',
  name: myRecipe.strMeal || myRecipe.strDrink,
  image: myRecipe.strMealThumb || myRecipe.strDrinkThumb,
});

export default function useFavoriteManager() {
  const [
    favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')) ?? []);

  const filterRecipes = (storedRecipes, recipe) => storedRecipes.filter(({ id }) => {
    const recipeId = recipe.id ?? recipe.idMeal ?? recipe.idDrink;
    return recipeId !== id;
  });

  const updateFavoriteStatus = useCallback((recipe) => {
    const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    const updatedRecipes = filterRecipes(storedRecipes, recipe);
    if (storedRecipes.length === updatedRecipes.length) {
      updatedRecipes.push(favoriteObject(recipe));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    setFavoriteRecipes(updatedRecipes);
  }, [setFavoriteRecipes]);

  return { favoriteRecipes, updateFavoriteStatus };
}

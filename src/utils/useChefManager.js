import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function useChefManager() {
  const [recipe, saveRecipe] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState('');

  const {
    doneRecipes,
    inProgressRecipes, setInProgressRecipes,
  } = useContext(RecipeContext);

  useEffect(() => {
    if (recipe.length) {
      const id = recipe[0].idMeal ?? recipe[0].idDrink;
      const itsDone = doneRecipes.some((done) => done.id === id);
      const inProgress = recipe[0].idMeal
        ? inProgressRecipes.meals : inProgressRecipes.cocktails;
      if (itsDone) {
        setRecipeStatus('');
      } else if (inProgress && inProgress[id]) {
        setRecipeStatus('Continue Recipe');
      } else {
        setRecipeStatus('Start Recipe');
      }
    }
  }, [recipe, inProgressRecipes, doneRecipes]);

  const updateRecipeStatus = (recipeToCheck) => saveRecipe(recipeToCheck);
  const startRecipe = (ingredients) => {
    const key = recipe[0].strMeal ? 'meals' : 'cocktails';
    const id = recipe[0].idMeal ?? recipe[0].idDrink;
    setInProgressRecipes({
      ...inProgressRecipes,
      [key]: { ...inProgressRecipes[key], [id]: ingredients },
    });
  };

  return { recipeStatus, updateRecipeStatus, startRecipe };
}

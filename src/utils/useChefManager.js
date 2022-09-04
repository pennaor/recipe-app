import { useState, useEffect } from 'react';

export default function useChefManager() {
  const [recipe, saveRecipe] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState('');
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) ?? [],
  );
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {},
  );

  useEffect(() => {
    if (recipe) {
      const id = recipe.idMeal ?? recipe.idDrink;
      const itsDone = doneRecipes.some((done) => done.id === id);
      const inProgress = recipe.idMeal
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
    const key = recipe.strMeal ? 'meals' : 'cocktails';
    const id = recipe.idMeal ?? recipe.idDrink;
    setInProgressRecipes({
      ...inProgressRecipes,
      [key]: { ...inProgressRecipes[key], [id]: ingredients },
    });
  };

  return {
    doneRecipes,
    setDoneRecipes,
    inProgressRecipes,
    setInProgressRecipes,
    recipeStatus,
    updateRecipeStatus,
    startRecipe,
  };
}

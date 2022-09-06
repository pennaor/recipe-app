import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const doneRecipeObject = (recipe) => ({
  id: recipe.idMeal ?? recipe.idDrink ?? recipe.id,
  type: recipe.strMeal ? 'food' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.strAlcoholic ? 'Alcoholic' : '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
  doneDate: new Date().toLocaleString('pt-BR'),
  tags: [],
});

const getIngredientsAndMeasures = (recipe) => {
  const MAX_INGREDIENTS = 20;
  const ingredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (!ingredient) {
      break;
    }
    ingredients.push({ ingredient, measure });
  }
  return ingredients;
};

export default function useChefManager() {
  const [recipe, saveRecipe] = useState();
  const [recipeStatus, setRecipeStatus] = useState('Start Recipe');
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) ?? [],
  );
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) ?? { meals: {}, cocktails: {} },
  );
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState();
  const history = useHistory();

  useEffect(() => {
    if (recipe) {
      setIngredients(getIngredientsAndMeasures(recipe));
    }
  }, [recipe, setIngredients]);

  useEffect(() => {
    if (recipe) {
      const id = recipe.idMeal ?? recipe.idDrink;
      const inProgress = recipe.idMeal
        ? inProgressRecipes.meals : inProgressRecipes.cocktails;

      if (inProgress && inProgress[id]) {
        setRecipeStatus('Continue Recipe');
        const recipeIngredients = inProgress[id] ?? [];
        setCheckedIngredients([...recipeIngredients]);
      }
    }
  }, [recipe, inProgressRecipes, setCheckedIngredients]);

  useEffect(() => {
    if (recipe) {
      const id = recipe.idMeal ?? recipe.idDrink;
      if (doneRecipes.some((done) => done.id === id)) {
        setRecipeStatus('');
      }
    }
  }, [recipe, doneRecipes]);

  const updateRecipeStatus = (recipeToCheck) => saveRecipe(recipeToCheck);

  const startRecipe = () => {
    const key = recipe.strMeal ? 'meals' : 'cocktails';
    const id = recipe.idMeal ?? recipe.idDrink;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [key]: { ...inProgressRecipes[key], [id]: [] },
    }));
    const uri = recipe.strMeal ? '/foods' : '/drinks';
    history.push(`${uri}/${id}/in-progress`);
  };

  const continueRecipe = () => {
    const id = recipe.idMeal ?? recipe.idDrink;
    const uri = recipe.strMeal ? '/foods' : '/drinks';
    history.push(`${uri}/${id}/in-progress`);
  };

  const updateInProgressRecipes = (scratchedIngredients) => {
    const key = recipe.strMeal ? 'meals' : 'cocktails';
    const id = recipe.idMeal ?? recipe.idDrink;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [key]: { ...inProgressRecipes[key], [id]: scratchedIngredients },
    }));
    setCheckedIngredients(scratchedIngredients);
  };

  const finishRecipe = () => {
    const key = recipe.strMeal ? 'meals' : 'cocktails';
    const id = recipe.idMeal ?? recipe.idDrink;
    delete inProgressRecipes[key][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...doneRecipes, doneRecipeObject(recipe)],
    ));
    history.push('/done-recipes');
  };

  return {
    doneRecipes,
    setDoneRecipes,
    inProgressRecipes,
    setInProgressRecipes,
    recipeStatus,
    updateRecipeStatus,
    startRecipe,
    continueRecipe,
    finishRecipe,
    updateInProgressRecipes,
    checkedIngredients,
    setCheckedIngredients,
    ingredients,
  };
}

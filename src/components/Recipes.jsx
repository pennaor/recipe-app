import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchRecipe from '../services/fetchRecipe';

export default function Recipes() {
  const {
    foodsDrinksRecipes, setFoodsDrinksRecipes, drinks, meals, searchClick,
    habilityFetch, setHabilityFetch } = useContext(RecipeContext);
  const [buttonClickCategory, setButtonClickCategory] = useState();
  const [buttonAll, setButtonAll] = useState(true);

  console.log(drinks);
  console.log(foodsDrinksRecipes);

  const { location: { pathname }, push } = useHistory();
  const TWELVE = 12;
  const FIVE = 5;
  const pathToRedirect = (pathname === '/foods' ? '/foods/' : '/drinks/');
  const dataTestidElement = (pathname === '/foods' ? 'Meal' : 'Drink');
  const buttonList = (pathname === '/foods' ? foodsDrinksRecipes
  && foodsDrinksRecipes['2'].meals
    .filter((_category, index) => index < FIVE) : foodsDrinksRecipes
    && foodsDrinksRecipes['3'].drinks
      .filter((_category, index) => index < FIVE));

  const fetchAPIDrinkFood = async () => {
    try {
      const responseDrink = await fetchRecipe('thecocktaildb', '', 'name');
      const responseFood = await fetchRecipe('themealdb', '', 'name');
      const responseFoodCategoryList = await fetchRecipe('themealdb', '', 'category');
      const responseDrinkCategoryList = await fetchRecipe('thecocktaildb',
        '', 'category');
      setFoodsDrinksRecipes([responseFood, responseDrink,
        responseFoodCategoryList, responseDrinkCategoryList]);
      setHabilityFetch(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [habilitySearch, setHabilitySearch] = useState(false);

  useEffect(() => {
    if (searchClick) setHabilitySearch(true);
  }, [searchClick]);

  useEffect(() => {
    // setFoodsDrinksRecipes();
    if ((meals.length > 0 || drinks.length > 0) && searchClick) {
      const mealsOrDrinks = foodsDrinksRecipes
       && (dataTestidElement === 'Meal' ? foodsDrinksRecipes
         .filter((e, i) => i !== 0) : foodsDrinksRecipes
         .filter((e, i) => i !== 1));
      setHabilitySearch(false);
      if (pathname === '/foods') {
        return setFoodsDrinksRecipes((mealsOrDrinks && meals)
        && [{ meals }, ...mealsOrDrinks]);
      }
      return setFoodsDrinksRecipes((mealsOrDrinks && drinks) && [mealsOrDrinks[0],
        { drinks }, mealsOrDrinks[1], mealsOrDrinks[2]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals, drinks]);

  const [foodsDrinksCategories, setFoodsDrinksCategories] = useState();

  const fetchAPIByCategories = async (category, path) => {
    try {
      const urlFilterByCategoriesFood = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const urlFilterByCategoriesDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(path === '/foods'
        ? urlFilterByCategoriesFood : urlFilterByCategoriesDrink)
        .then((data) => data.json());
      setFoodsDrinksCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (habilityFetch) fetchAPIDrinkFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (buttonClickCategory === '') {
      setButtonAll(true);
    }
    if (buttonClickCategory !== '' && buttonClickCategory) {
      setButtonAll(false);
    }
    fetchAPIByCategories(buttonClickCategory, pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCategory]);

  const listToRender = () => (pathname === '/foods'
    ? foodsDrinksRecipes && (buttonAll
      ? foodsDrinksRecipes['0'].meals
      : foodsDrinksCategories && (foodsDrinksCategories.meals
        || foodsDrinksRecipes['0'].meals))
    : foodsDrinksRecipes && (buttonAll
      ? foodsDrinksRecipes['1'].drinks
      : foodsDrinksCategories && (foodsDrinksCategories.drinks
            || foodsDrinksRecipes['1'].drinks)));

  const render = listToRender();

  return (
    <div>
      <div>
        {
          buttonList && buttonList.map((button) => button && (
            <button
              type="button"
              data-testid={ `${button.strCategory}-category-filter` }
              key={ button.strCategory }
              onClick={ () => {
                if (buttonClickCategory === button.strCategory) {
                  setButtonClickCategory('');
                  return;
                }
                setButtonClickCategory(button.strCategory);
              } }
            >
              {button.strCategory}

            </button>
          ))
        }
        <button
          type="button"
          onClick={ () => setButtonAll(true) }
          data-testid="All-category-filter"
        >
          All
        </button>

      </div>
      {
        (render && render
          .map((meal, index) => (index < TWELVE) && (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ meal[`str${dataTestidElement}Thumb`] }
              onClick={ () => {
                push(`${pathToRedirect}${meal[`id${dataTestidElement}`]}`);
              } }
              onKeyPress={ () => {
                push(`${pathToRedirect}${meal[`id${dataTestidElement}`]}`);
              } }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ meal[`str${dataTestidElement}Thumb`] }
                alt={ meal[`str${dataTestidElement}Thumb}`] }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {meal[`str${dataTestidElement}`]}

              </p>
            </div>
          )))
      }
    </div>
  );
}

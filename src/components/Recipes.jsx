import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { fetchRecipeAll } from '../services/fetchRecipe';

export default function Recipes() {
  const {
    foodsDrinksRecipes, setFoodsDrinksRecipes } = useContext(RecipeContext);
  const [buttonClickCategory, setButtonClickCategory] = useState();
  const [buttonAll, setButtonAll] = useState(true);

  const { pathname } = useHistory().location;
  const TWELVE = 12;
  const FIVE = 5;
  const dataTestidElement = (pathname === '/foods' ? 'Meal' : 'Drink');
  const buttonList = (pathname === '/foods' ? foodsDrinksRecipes
  && foodsDrinksRecipes['2'].meals
    .filter((_category, index) => index < FIVE) : foodsDrinksRecipes
    && foodsDrinksRecipes['3'].drinks
      .filter((_category, index) => index < FIVE));

  const fetchAPIDrinkFood = async () => {
    try {
      const urlDrink = fetchRecipeAll('thecocktaildb', 'all');
      const urlFood = fetchRecipeAll('themealdb', 'all');
      const urlFoodCategoryList = fetchRecipeAll('themealdb', 'categories');
      const urlDrinkCategoryList = fetchRecipeAll('thecocktaildb', 'categories');
      const responseDrink = await fetch(urlDrink).then((data) => data.json());
      const responseFood = await fetch(urlFood).then((data) => data.json());
      const responseFoodCategoryList = await fetch(urlFoodCategoryList)
        .then((data) => data.json());
      const responseDrinkCategoryList = await fetch(urlDrinkCategoryList)
        .then((data) => data.json());
      setFoodsDrinksRecipes([responseFood, responseDrink,
        responseFoodCategoryList, responseDrinkCategoryList]);
    } catch (error) {
      console.log(error);
    }
  };

  const [foodsDrinksCategories, setFoodsDrinksCategories] = useState();

  const fetchAPIByCategories = async (category, path) => {
    try {
      const urlFilterByCategoriesFood = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const urlFilterByCategoriesDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(path === '/foods'
        ? urlFilterByCategoriesFood : urlFilterByCategoriesDrink)
        .then((data) => data.json());
      setFoodsDrinksCategories(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIDrinkFood();
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

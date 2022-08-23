import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Recipes() {
  const { meals, drinks, searchClick,
    foodsDrinksRecipes, setFoodsDrinksRecipes } = useContext(RecipeContext);

  const { pathname } = useHistory().location;
  const TWELVE = 12;
  const FIVE = 5;
  const recipesElement = (pathname === '/foods' ? meals : drinks);
  const dataTestidElement = (pathname === '/foods' ? 'Meal' : 'Drink');
  const buttonList = (pathname === '/foods' ? foodsDrinksRecipes
  && foodsDrinksRecipes['2'].meals
    .filter((_category, index) => index < FIVE) : foodsDrinksRecipes
    && foodsDrinksRecipes['3'].drinks
      .filter((_category, index) => index < FIVE));

  const fetchAPIDrinkFood = async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const urlFoodCategoryList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const urlDrinkCategoryList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const responseDrink = await fetch(urlDrink).then((data) => data.json());
    const responseFood = await fetch(urlFood).then((data) => data.json());
    const responseFoodCategoryList = await fetch(urlFoodCategoryList)
      .then((data) => data.json());
    const responseDrinkCategoryList = await fetch(urlDrinkCategoryList)
      .then((data) => data.json());
    setFoodsDrinksRecipes([responseFood, responseDrink,
      responseFoodCategoryList, responseDrinkCategoryList]);
  };

  console.log(foodsDrinksRecipes);
  console.log(searchClick);
  console.log(buttonList);

  useEffect(() => {
    fetchAPIDrinkFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        {
          buttonList && buttonList.map((button) => button && (
            <button
              type="button"
              data-testid={ `${button.strCategory}-category-filter` }
              key={ button.strCategory }
            >
              {button.strCategory}

            </button>
          ))
        }
      </div>
      { (meals.length > 0 || drinks.length > 0)
      && recipesElement
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
            <p data-testid={ `${index}-card-name` }>{meal[`str${dataTestidElement}`]}</p>
          </div>
        ))}
      {
        !searchClick
        && (pathname === '/foods'
          ? foodsDrinksRecipes && foodsDrinksRecipes['0'].meals
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
            )) : foodsDrinksRecipes && foodsDrinksRecipes['1'].drinks
            .map((drink, index) => (index < TWELVE) && (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ drink[`str${dataTestidElement}Thumb`] }
              >
                <img
                  src={ drink[`str${dataTestidElement}Thumb`] }
                  alt={ drink[`str${dataTestidElement}Thumb}`] }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {drink[`str${dataTestidElement}`]}

                </p>
              </div>
            )))
      }
    </div>
  );
}

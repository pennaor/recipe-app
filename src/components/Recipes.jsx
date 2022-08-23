import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchRecipe from '../services/fetchRecipe';

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
    const responseDrink = await fetchRecipe('thecocktaildb', '', 'name');
    const responseDrinkCategoryList = await fetchRecipe('thecocktaildb', '', 'category');
    const responseFood = await fetchRecipe('themealdb', '', 'name');
    const responseFoodCategoryList = await fetchRecipe('themealdb', '', 'category');
    setFoodsDrinksRecipes([responseFood, responseDrink,
      responseFoodCategoryList, responseDrinkCategoryList]);
  };

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

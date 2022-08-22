import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Recipes() {
  const { meals, drinks } = useContext(RecipeContext);
  const { pathname } = useHistory().location;
  const TWELVE = 12;
  const recipesElement = (pathname === '/foods' ? meals : drinks);
  const dataTestidElement = (pathname === '/foods' ? 'Meal' : 'Drink');
  return (
    <div>
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
    </div>
  );
}

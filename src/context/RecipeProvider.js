import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    mealsToken: '1',
    cocktailsToken: '1',
  });

  const [meals, setMeals] = useState([]);

  const [drinks, setDrinks] = useState([]);

  const setUserState = (changes) => {
    setUser({ ...user, ...changes });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    if (storedUser) setUserState(storedUser);
    if (mealsToken) setUserState({ mealsToken });
    if (cocktailsToken) setUserState({ cocktailsToken });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchClick, setSearchClick] = useState(false);
  const [foodsDrinksRecipes, setFoodsDrinksRecipes] = useState();

  const context = {
    user,
    setUserState,
    meals,
    setMeals,
    drinks,
    setDrinks,
    searchClick,
    setSearchClick,
    foodsDrinksRecipes,
    setFoodsDrinksRecipes,
  };

  return (
    <RecipeContext.Provider value={ context }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropType.node.isRequired,
};

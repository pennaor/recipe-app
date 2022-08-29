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
    setUserState({
      email: storedUser ? storedUser.email : '',
      mealsToken: localStorage.getItem('mealsToken') ?? '1',
      cocktailsToken: localStorage.getItem('cocktailsToken') ?? '1',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchClick, setSearchClick] = useState(false);
  const [foodsDrinksRecipes, setFoodsDrinksRecipes] = useState();
  const [habilityFetch, setHabilityFetch] = useState(true);

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
    habilityFetch,
    setHabilityFetch,
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

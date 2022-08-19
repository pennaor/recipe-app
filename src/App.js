import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import FoodDetails from './pages/foods/FoodDetails';
import DrinkDetails from './pages/drinks/DrinkDetails';
import FoodsInProgress from './pages/foods/FoodsInProgress';
import DrinksInProgress from './pages/drinks/DrinksInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeContext from './context/RecipeContext';

function App() {
  const { setStoredToken, setStoredUser } = useContext(RecipeContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    if (storedUser) setStoredUser(storedUser);
    if (mealsToken) setStoredToken({ mealsToken });
    if (cocktailsToken) setStoredToken({ cocktailsToken });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
        <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route path="/foods/:id" component={ FoodDetails } />
        <Route path="/drinks/:id" component={ DrinkDetails } />
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;

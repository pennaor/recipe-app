import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import FoodDetails from './pages/foods/FoodDetails';
import DrinkDetails from './pages/drinks/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/foods/:id" component={ FoodDetails } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails';

export default function DrinkDetails() {
  const { params: { id }, url } = useRouteMatch();

  return <RecipeDetails infos={ { api: 'thecocktaildb', id, url } } />;
}

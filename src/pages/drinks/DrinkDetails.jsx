import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe';

export default function DrinkDetails() {
  const { params: { id }, url } = useRouteMatch();

  return <CardRecipe infos={ { api: 'thecocktaildb', id, url } } />;
}

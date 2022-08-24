import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe';

export default function FoodDetails() {
  const { params: { id }, url } = useRouteMatch();

  return <CardRecipe infos={ { api: 'themealdb', id, url } } />;
}

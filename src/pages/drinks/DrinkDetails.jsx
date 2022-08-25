import React from 'react';
import { useParams } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe';

export default function DrinkDetails() {
  const { id } = useParams();

  return <CardRecipe infos={ { api: 'thecocktaildb', id } } />;
}

import React from 'react';
import { useParams } from 'react-router-dom';
import CardRecipe from '../../components/RecipeDetails';

export default function DrinkDetails() {
  const { id } = useParams();

  return <CardRecipe infos={ { api: 'thecocktaildb', id } } />;
}

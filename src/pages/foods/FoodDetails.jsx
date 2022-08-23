import React from 'react';
import { useParams } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe';

export default function FoodDetails() {
  const { id } = useParams();

  return <CardRecipe infos={ { api: 'themealdb', id } } />;
}

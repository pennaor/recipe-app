import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRecipe from '../../services/fetchRecipe';

export default function DrinkDetails() {
  const { id } = useParams();

  useEffect(() => {
    const fetchMeal = async () => {
      console.log(await fetchRecipe('thecocktaildb', id));
    };
    fetchMeal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<h1>DrinkDetails</h1>);
}

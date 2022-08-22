import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRecipe from '../../services/fetchRecipe';

export default function FoodDetails() {
  // const [myFood, setMyFood] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchMeal = async () => {
      console.log(await fetchRecipe('themealdb', id));
    };
    fetchMeal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Foods
    </div>
  );
}

import { drinks_firstLetterA, meals_firstLetterA } from "./mockData/firstLetterA";
import { drinks_ingredient, meals_ingredient } from "./mockData/ingredient";
import { drinks_name, meals_name } from "./mockData/name";

const mockFetch = (url) => Promise.resolve({
  ok: true,
  status: 200,
  json: () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Cheese':
      return Promise.resolve(meals_ingredient);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
      return Promise.resolve(meals_name);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(meals_firstLetterA);
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka':
      return Promise.resolve(drinks_ingredient);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
      return Promise.resolve(drinks_name);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(drinks_firstLetterA);
    default:
      return Promise.reject(new Error('URL inválida!'));
    }
  }
});

export default mockFetch;

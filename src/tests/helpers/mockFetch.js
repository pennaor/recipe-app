import { categoriesDrink, categoriesMeals } from './mockData/categoryName';
import { drinks } from './mockData/drinks';
import { drinks_firstLetterA, meals_firstLetterA } from "./mockData/firstLetterA";
import { drinks_ingredient, meals_ingredient } from "./mockData/ingredient";
import { meals } from './mockData/meals';
import { drinks_name, meals_name } from "./mockData/name";
import { drinks_single, meals_single } from './mockData/single';

const mockFetch = (url) => Promise.resolve({
  ok: true,
  status: 200,
  json: () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(meals);
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Cheese':
      return Promise.resolve(meals_ingredient);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
      return Promise.resolve(meals_name);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(meals_firstLetterA);
    case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
      return Promise.resolve(categoriesMeals);
    case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
      return Promise.resolve(meals_single);

    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(drinks);
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka':
      return Promise.resolve(drinks_ingredient);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
      return Promise.resolve(drinks_name);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(drinks_firstLetterA);
    case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
      return Promise.resolve(categoriesDrink);
    case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
      return Promise.resolve(drinks_single);

    default:
      if (url.includes('themealdb')) {
        return Promise.resolve({ meals: null });
      } else if (url.includes('thecocktaildb')) {
        return Promise.resolve({ drinks: null });
      }
      return Promise.resolve(new Error(`URL invalida: ${url}`));
    }
  }
});

export default mockFetch;

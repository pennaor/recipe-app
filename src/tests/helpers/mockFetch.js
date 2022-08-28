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

    // API response pattern:
    // theMealDB: { meals: [ ...{ recipe } ] }
    // theCocktailDB: { drinks: [ ...{ recipe } ] }
  
    // Meals fetchs:
    // by generic ones
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(meals);
    // by ingredients
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Cheese':
      return Promise.resolve(meals_ingredient);
    // by name
    // 'Big' returns array of length 2; 'Big Mac' returns array of length 1;
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Big':
      return Promise.resolve(meals_name);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Big Mac':
      return Promise.resolve(meals_single);
    // by first letter
    case 'https://www.themealdb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(meals_firstLetterA);
    // by categories
    case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
      return Promise.resolve(categoriesMeals);
    // by meal id '53013': returns array of length 1 with Big Mac recipe;
    case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013':
      return Promise.resolve(meals_single);

    // Drinks fetchs
    // by generic ones
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(drinks);
    // by ingredient
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka':
      return Promise.resolve(drinks_ingredient);
    // by name
    // 'Aqua' returns array of length 2; 'Aquamarine' returns array of length 1;
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aqua':
      return Promise.resolve(drinks_name);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
      return Promise.resolve(drinks_single);
    // by first letter
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A':
      return Promise.resolve(drinks_firstLetterA);
    // by categories
    case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
      return Promise.resolve(categoriesDrink);
    // by drink id '178319': returns array of length 1 with Aquamarine recipe;
    case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
      return Promise.resolve(drinks_single);

    default:
      // fetch without results
      if (url.includes('themealdb')) {
        return Promise.resolve({ meals: null });
      } else if (url.includes('thecocktaildb')) {
        return Promise.resolve({ drinks: null });
      }
      // fetched with abnormal url
      return Promise.resolve(new Error(`Invalid URL: ${url}`));
    }
  }
});

export default mockFetch;

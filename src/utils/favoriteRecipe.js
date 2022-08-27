import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const favoriteObject = (myRecipe, id) => ({
  id,
  type: myRecipe[0].strMeal ? 'food' : 'drink',
  nationality: myRecipe[0].strArea || '',
  category: myRecipe[0].strCategory,
  alcoholicOrNot: myRecipe[0].strAlcoholic ? 'Alcoholic' : '',
  name: myRecipe[0].strMeal || myRecipe[0].strDrink,
  image: myRecipe[0].strMealThumb || myRecipe[0].strDrinkThumb,
});

const desfavoriteRecipe = (idToDesfavorite, setFavorite) => {
  setFavorite(whiteHeartIcon);
  const filterRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .filter(({ id: idRecipe }) => idRecipe !== idToDesfavorite);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...filterRecipes]));
};

const favoriteRecipe = (myRecipe, id, favorite, setFavorite) => {
  if (favorite === whiteHeartIcon) {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteObject(myRecipe, id)]));
    } else {
      const arrayLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...arrayLocal, favoriteObject(myRecipe, id)]));
    } setFavorite(blackHeartIcon);
  } else {
    desfavoriteRecipe(id, setFavorite);
  }
};

export default favoriteRecipe;

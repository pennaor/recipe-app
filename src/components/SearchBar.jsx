import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchRecipe from '../services/fetchRecipe';

export default function SearchBar() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filtersValue, setFiltersValue] = useState('ingredient');

  const { setMeals, setDrinks, setSearchClick } = useContext(RecipeContext);
  const history = useHistory();

  const onChangeSearchInput = ({ target }) => setSearchInputValue(target.value);
  const onChangeFiltersValue = ({ target }) => setFiltersValue(target.value);

  const searchByMeals = async () => {
    const result = await fetchRecipe('themealdb', searchInputValue, filtersValue);
    if (result && result.meals) {
      setMeals(result.meals);
      if (result.meals.length === 1) history.push(`/foods/${result.meals[0].idMeal}`);
    }
  };

  const searchByDrinks = async () => {
    const result = await fetchRecipe('thecocktaildb', searchInputValue, filtersValue);
    if (result && result.drinks) {
      setDrinks(result.drinks);
      if (result.drinks.length === 1) history.push(`/drinks/${result.drinks[0].idDrink}`);
    }
  };

  const onSubmitRecipeQuery = async (event) => {
    event.preventDefault();
    if (filtersValue === 'firstLetter' && searchInputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (history.location.pathname === '/foods') {
      searchByMeals();
      return;
    }
    searchByDrinks();
  };

  return (
    <form onSubmit={ onSubmitRecipeQuery }>
      <input
        type="text"
        title="Buscar receitas"
        placeholder="Buscar receitas"
        value={ searchInputValue }
        onChange={ onChangeSearchInput }
        data-testid="search-input"
        required
      />
      <div>
        <label htmlFor="ingredientFilter">
          <input
            type="radio"
            name="searchFilter"
            value="ingredient"
            id="ingredientFilter"
            onChange={ onChangeFiltersValue }
            checked={ filtersValue === 'ingredient' }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="nameFilter">
          <input
            type="radio"
            name="searchFilter"
            value="name"
            id="nameFilter"
            onChange={ onChangeFiltersValue }
            checked={ filtersValue === 'name' }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="firtLetterFilter">
          <input
            type="radio"
            name="searchFilter"
            value="firstLetter"
            id="firtLetterFilter"
            onChange={ onChangeFiltersValue }
            checked={ filtersValue === 'firstLetter' }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>
      <button
        type="submit"
        onClick={ () => setSearchClick(true) }
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </form>
  );
}

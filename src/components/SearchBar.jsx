import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import RecipeContext from '../context/RecipeContext';
import fetchRecipe from '../services/fetchRecipe';

export default function SearchBar({ showSearchInput }) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filtersValue, setFiltersValue] = useState('ingredient');

  const { setMeals, setDrinks, setSearchClick } = useContext(RecipeContext);
  const history = useHistory();

  const onChangeSearchInput = ({ target }) => setSearchInputValue(target.value);
  const onChangeFiltersValue = ({ target }) => setFiltersValue(target.value);

  const searchByMeals = async () => {
    const result = await fetchRecipe('themealdb', searchInputValue, filtersValue);
    if (result.meals && result.meals.length) {
      setMeals(result.meals);
      if (result.meals.length === 1) history.push(`/foods/${result.meals[0].idMeal}`);
      return;
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const searchByDrinks = async () => {
    const result = await fetchRecipe('thecocktaildb', searchInputValue, filtersValue);
    if (result.drinks && result.drinks.length) {
      setDrinks(result.drinks);
      if (result.drinks.length === 1) history.push(`/drinks/${result.drinks[0].idDrink}`);
      return;
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
    <Collapse in={ showSearchInput }>
      <div className="search-bar">
        { showSearchInput && (
          <form
            id="searchbar-form"
            onSubmit={ onSubmitRecipeQuery }
            className="form-inline my-md-0 search-bar-form"
          >
            <input
              type="text"
              title="Buscar receitas"
              placeholder="Buscar receitas"
              value={ searchInputValue }
              onChange={ onChangeSearchInput }
              data-testid="search-input"
              required
              className="form-control"
            />
            <div className="filters-div">
              <label htmlFor="ingredientFilter">
                <input
                  type="radio"
                  name="searchFilter"
                  value="ingredient"
                  id="ingredientFilter"
                  onChange={ onChangeFiltersValue }
                  checked={ filtersValue === 'ingredient' }
                  data-testid="ingredient-search-radio"
                  className="filters-radio"
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
                  className="filters-radio"
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
                  className="filters-radio"
                />
                First letter
              </label>
            </div>
            <button
              type="submit"
              onClick={ () => setSearchClick(true) }
              data-testid="exec-search-btn"
              className="btn btn-sm btn-danger btn-block search-bar-button"
            >
              Search
            </button>
          </form>
        ) }
      </div>
    </Collapse>
  );
}

SearchBar.propTypes = {
  showSearchInput: PropTypes.bool.isRequired,
};

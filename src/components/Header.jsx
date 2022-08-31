import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';

function Header() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const history = useHistory();
  const { location } = history;
  let pageTitle;
  let hideSearchIcon = true;

  switch (location.pathname) {
  case '/foods':
    pageTitle = 'Foods';
    hideSearchIcon = false;
    break;
  case '/drinks':
    pageTitle = 'Drinks';
    hideSearchIcon = false;
    break;
  case '/done-recipes':
    pageTitle = 'Done Recipes';
    break;
  case '/profile':
    pageTitle = 'Profile';
    break;
  default:
    pageTitle = 'Favorite Recipes';
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="icone de perfil"
              data-testid="profile-top-btn"
              className="profile-img"
            />
          </Link>
          { !hideSearchIcon && (
            <button
              type="button"
              onClick={ () => setShowSearchInput(!showSearchInput) }
              aria-controls="searchbar-form"
              aria-expanded={ showSearchInput }
              className="search-button"
            >
              <img
                src={ searchIcon }
                alt="icone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          ) }
        </nav>
      </header>
      <h1 data-testid="page-title">{ pageTitle }</h1>
      <SearchBar showSearchInput={ showSearchInput } />
    </>
  );
}

export default Header;

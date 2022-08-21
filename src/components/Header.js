import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
  case '/favorite-recipes':
    pageTitle = 'Favorite Recipes';
    break;
  default:
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="icone de perfil"
              data-testid="profile-top-btn"
            />
          </Link>
          <div>
            { !hideSearchIcon && (
              <button
                type="button"
                onClick={ () => setShowSearchInput(!showSearchInput) }
              >
                <img
                  src={ searchIcon }
                  alt="icone de pesquisa"
                  data-testid="search-top-btn"
                />
              </button>
            ) }
            { showSearchInput && (
              <input
                type="text"
                data-testid="search-input"
                placeholder="Buscar receitas"
              />
            ) }
          </div>
        </nav>
      </header>
      <h1 data-testid="page-title">{ pageTitle }</h1>
    </>
  );
}

export default Header;

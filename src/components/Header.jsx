/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  case '/favorite-recipes':
    pageTitle = 'Favorite Recipes';
    break;
  default:
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/profile" className="navbar-brand">
              <img
                src={ profileIcon }
                alt="icone de perfil"
                data-testid="profile-top-btn"
              />
            </Link>
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

            <div className="collapse navbar-collapse" id="navbarsExample07">
              { showSearchInput && (
                <SearchBar />
              ) }
            </div>
          </div>
        </nav>
      </header>
      <h1 data-testid="page-title">{ pageTitle }</h1>
    </>
  );
}

export default Header;

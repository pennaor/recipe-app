import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pathname } = (useHistory().location);
  // const pageTitle = '';
  // if (pathname === )
  console.log(pathname);
  return (
    <>
      <img src={ profileIcon } alt="icone de perfil" data-testid="profile-top-btn" />
      {(pathname !== '/done-recipes' && pathname !== '/profile'
      && pathname !== '/favorite-recipes') && (
        <img src={ searchIcon } alt="icone de pesquisa" data-testid="search-top-btn" />
      )}
      {/* <h1>{`${document.title}`}</h1> */}
    </>
  );
}

export default Header;

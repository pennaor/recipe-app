import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Profile.css';

export default function Profile() {
  const [email, setEmail] = useState('');
  const { push } = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    push('/');
  };

  return (
    <div className="div">
      <main>
        <section className="navigation">
          <p data-testid="profile-email" className="profile-email">
            {
              email.length > 0 ? email : 'Email'
            }
          </p>
          <button
            className="btn btn-info profile-button"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            className="btn btn-info profile-button"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className="btn btn-danger profile-button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => logout() }
          >
            Logout
          </button>
        </section>
      </main>
    </div>
  );
}

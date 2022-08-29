import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div>
      <Header />
      <main>
        <section className="navigation">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => logout() }
          >
            Logout
          </button>
        </section>
        <p data-testid="profile-email">
          {
            email.length > 0 ? email : 'Email'
          }
        </p>
      </main>
      <Footer />
    </div>
  );
}

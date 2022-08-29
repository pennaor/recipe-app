import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div>
      <Header />
      <main>
        <section className="navigation">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </section>
        <p data-testid="profile-email">Email</p>
      </main>
      <Footer />
    </div>
  );
}

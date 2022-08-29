import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')).email);
  }, []);
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
        <p data-testid="profile-email">{ email }</p>
      </main>
      <Footer />
    </div>
  );
}

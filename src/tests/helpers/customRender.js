import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipeProvider from '../../context/RecipeProvider';

/** RTL render with Router and Recipe Provider */
function customRender(component, initialPath = '/') {
  const history = createMemoryHistory({ initialEntries: [initialPath] });
  return {
    ...render(
      <Router history={ history }>
        <RecipeProvider>
          { component }
        </RecipeProvider>
      </Router>,
    ),
    history,
  };
}

export default customRender;
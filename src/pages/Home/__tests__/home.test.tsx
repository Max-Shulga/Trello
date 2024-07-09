import '@testing-library/jest-dom';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import home from '../../../store/reducers/home/homeSlice';
import Home from '../Home';

const mockStore = configureStore({
  reducer: {
    home,
  },
  preloadedState: {
    home: {
      boards: [],
      isLoading: false,
    },
  },

});

test('Home page', () => {
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>,
  );
  const textElement = screen.getByText(/Creat/);
  expect(textElement).toBeInTheDocument();
});

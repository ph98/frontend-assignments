import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { mockMatchMedia } from './setupTests';

describe('App', () => {
  beforeAll(() => {
    mockMatchMedia();
  });
  it('renders app correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const searchInputElement = screen.getByPlaceholderText(/please search here/i);
    expect(searchInputElement).toBeInTheDocument();
  });
});

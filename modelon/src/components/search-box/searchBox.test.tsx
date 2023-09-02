import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Middleware, Store } from '@reduxjs/toolkit';
import SearchBox from './searchBox';
import { mockMatchMedia } from '../../setupTests';

const middleware: Middleware[] = [];
const mockStore = configureStore(middleware);

describe('table page should be rendered correctly', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  let store: Store;

  beforeEach(() => {
    store = mockStore({
      searchTerm: '',
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <SearchBox placeholder="Test Placeholder" />
      </Provider>,
    );
  });

  it('should show the correct placeholder based on the props', () => {
    render(
      <Provider store={store}>
        <SearchBox placeholder="Test Placeholder" />
      </Provider>,
    );
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should update the value of the input field', () => {
    render(
      <Provider store={store}>
        <SearchBox placeholder="Test Placeholder" />
      </Provider>,
    );
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), { target: { value: 'example' } });
    expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue('example');

    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), { target: { value: '' } });
    expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue('');
  });
});

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import TableComponent from './table';
import store from '../../store';
import { mockMatchMedia } from '../../setupTests';

describe('table page should be rendered correctly', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  it('should have the right className', () => {
    render(
      <Provider store={store}>
        <TableComponent />
      </Provider>,
    );
    // expect(screen)
  });
});

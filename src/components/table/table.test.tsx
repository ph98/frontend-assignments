import { render, screen } from '@testing-library/react';
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

    const headers = screen.getAllByRole('columnheader');

    expect(headers).toHaveLength(9);
    expect(headers[0]).toHaveTextContent('Customer name');
    expect(headers[1]).toHaveTextContent('Customer e-mail');
    expect(headers[2]).toHaveTextContent('Country');
    expect(headers[3]).toHaveTextContent('Gender');
    expect(headers[4]).toHaveTextContent('Age');
    expect(headers[5]).toHaveTextContent('Annual Salary');
    expect(headers[6]).toHaveTextContent('Credit card debt');
    expect(headers[7]).toHaveTextContent('Net worth');
    expect(headers[8]).toHaveTextContent('Car purchase amount');
  });
});

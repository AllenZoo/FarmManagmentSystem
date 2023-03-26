import { render, screen } from '@testing-library/react';

import App from '@src/App';

/* -------------------------------------------------------------------------- */
/*                                 UNIT TESTS                                 */
/* -------------------------------------------------------------------------- */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app');
  expect(linkElement).toBeInTheDocument();
});

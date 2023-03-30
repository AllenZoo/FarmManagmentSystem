import { render, screen } from '@testing-library/react';

import MainPage from '@src/pages/MainPage/MainPage';

import FarmerActions from '@src/pages/MainPage/FarmerActions';
import UserInfo from '@src/pages/MainPage/UserInfo';
import CompanyFunFacts from '@src/pages/MainPage/CompanyFunFacts';
import Housing from '@src/pages/MainPage/Housing';

/* -------------------------------------------------------------------------- */
/*                                 UNIT TESTS                                 */
/* -------------------------------------------------------------------------- */
test('renders main page', () => {
  render(<MainPage />);
  const pageElement = screen.getByTestId('main-page');
  expect(pageElement).toBeInTheDocument();
});

test('buttons for farm actions', () => {
  // click on the farmer actions button

});

test('buttons for user info', () => {
  // click on the user info button

});

test('buttons for company fun facts', () => {
  // click on the company fun facts button

});

test('buttons for housing', () => {
  // click on the housing button

});

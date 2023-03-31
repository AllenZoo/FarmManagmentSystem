import { render, screen } from '@testing-library/react';

import MainPage from '@src/pages/DashboardPage';

import FarmerActions from '@src/pages/DashboardPage/FarmerActions';
import UserInfo from '@src/pages/DashboardPage/UserInfo';
import CompanyFunFacts from '@src/pages/DashboardPage/CompanyFunFacts';
import Housing from '@src/pages/DashboardPage/Housing';

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

import { render, screen } from '@testing-library/react';

import MainPage from '@pages/DashboardPage';

import FarmerActions from '@pages/DashboardPage/FarmActionsPage';
import UserInfo from '@pages/DashboardPage/UserInfoPage';
import CompanyFunFacts from '@pages/DashboardPage/CompanyFunFactsPage';
import Housing from '@pages/DashboardPage/HousingPage';

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

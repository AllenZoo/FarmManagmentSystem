import styled from 'styled-components';

import NavBar from '@components/NavBar';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledErrorPage = styled.div`
  color: #fff;
  text-align: center;
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <NavBar />

      <h1>404</h1>
      <h2>Page not found</h2>
      
      <p>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. <br />
        As a result, all of your plants wilted and died because you couldn't water them in time. <br />
        Better luck next time!
      </p>
    </StyledErrorPage>
  );
}

export default ErrorPage;

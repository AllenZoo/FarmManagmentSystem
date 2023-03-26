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
    </StyledErrorPage>
  );
}

export default ErrorPage;

import styled from 'styled-components';
import NavItems from '@/components/navigation/NavItems';

const DesktopNav = () => {
  return (
    <StyledDesktopNav>
      <NavItems />
    </StyledDesktopNav>
  );
};

export default DesktopNav;

const StyledDesktopNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-width: 48rem;
`;

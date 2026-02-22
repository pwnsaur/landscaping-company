import styled from 'styled-components';

import NavItems from '@/components/navigation/NavItems';
import { media } from '@/styles/media';

type DesktopNavProps = {
  currentPath: string;
};

const DesktopNav = ({ currentPath }: DesktopNavProps) => {
  return (
    <StyledDesktopNav>
      <NavItems currentPath={currentPath} />
    </StyledDesktopNav>
  );
};

export default DesktopNav;

const StyledDesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  ${media.down('tablet')`
    display: none;
  `}
`;

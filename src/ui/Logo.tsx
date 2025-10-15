import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { theme } = useTheme();

  return (
    <StyledLogo>
      <Img src={`/logo-${theme}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

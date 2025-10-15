import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LogoutButton from '@/features/auth/components/LogoutButton';
import ButtonIcon from './ButtonIcon';
import ToggleDarkModeButton from './ToggleDarkModeButton';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ToggleDarkModeButton />
      </li>
      <li>
        <LogoutButton />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

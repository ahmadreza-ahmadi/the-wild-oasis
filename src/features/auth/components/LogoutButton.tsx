import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '@/ui/ButtonIcon';
import SpinnerMini from '@/ui/SpinnerMini';
import { useLogout } from '../hooks/useLogout';

function LogoutButton() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon onClick={() => logout()}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default LogoutButton;

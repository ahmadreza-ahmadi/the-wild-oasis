import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useTheme } from '@/contexts/ThemeContext';
import ButtonIcon from './ButtonIcon';

function ToggleDarkModeButton() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ButtonIcon onClick={handleToggle}>
      {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default ToggleDarkModeButton;

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface Position {
  x: number;
  y: number;
}

interface StyledListProps {
  $position: Position;
}

const ListOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type ListId = string | number | null;

interface MenusContext {
  openId: ListId;
  toggle: (id: ListId) => void;
  close: () => void;
  position: Position | null;
  setPosition: Dispatch<SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContext | null>(null);

function useMenus() {
  const context = useContext(MenusContext);
  if (context === null)
    throw new Error('useMenu is only accessible inside its provider');
  return context;
}

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<ListId>(null);
  const [position, setPosition] = useState<Position | null>(null);

  function toggle(id: typeof openId) {
    if (openId === id) setOpenId(null);
    else setOpenId(id);
  }

  const close = () => setOpenId(null);

  return (
    <MenusContext value={{ openId, toggle, position, setPosition, close }}>
      <div>{children}</div>
    </MenusContext>
  );
}

interface ToggleProps {
  id: ListId;
}

function Toggle({ id }: ToggleProps) {
  const { toggle, setPosition, openId } = useMenus();
  const toggleRef = useRef<HTMLButtonElement>(null);

  function calcPosition(el: HTMLElement) {
    const { width, x, y, height } = el.getBoundingClientRect();
    return { x: window.innerWidth - width - x, y: y + height + 8 };
  }

  function handleClick() {
    setPosition(calcPosition(toggleRef.current!));
    toggle(id);
  }

  useEffect(() => {
    const listener = () => {
      if (openId !== id) return;
      setPosition(calcPosition(toggleRef.current!));
    };

    window.addEventListener('scroll', listener, true);

    return () => window.removeEventListener('scroll', listener, true);
  }, [setPosition, openId, id]);

  return (
    <StyledToggle
      ref={toggleRef}
      onClick={handleClick}
      style={{ zIndex: openId === id ? 10 : 0 }}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: ListId;
  children: React.ReactNode;
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useMenus();

  if (openId !== id) return null;

  return createPortal(
    <ListOverlay onClick={(e) => e.target === e.currentTarget && close()}>
      <StyledList $position={position || { x: 0, y: 0 }}>{children}</StyledList>
    </ListOverlay>,
    document.body
  );
}

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function Button({ children, icon, onClick, ...rest }: ButtonProps) {
  const { close } = useMenus();

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} {...rest}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

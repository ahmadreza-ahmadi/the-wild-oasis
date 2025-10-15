/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  min-width: 320px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

export interface ModalProps {
  children: React.ReactNode;
}

interface ModalContext {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

export const ModalContext = createContext<ModalContext | null>(null);

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const open = setOpenName;
  const close = () => setOpenName('');

  return (
    <ModalContext value={{ openName, open, close }}>{children}</ModalContext>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === null)
    throw new Error('useModal is used outside of its provider');
  return context;
}

type WindowProps = {
  name: string;
} & (
  | {
      renderProps?: false;
      children: React.ReactNode;
    }
  | {
      renderProps: true;
      renderContent: (close: () => void) => React.ReactNode;
    }
);

function Window(props: WindowProps) {
  const { close, openName } = useModal();

  const isOpen = openName === props.name;

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={(e) => e.target === e.currentTarget && close()}>
      <StyledModal>
        <CloseButton onClick={() => close()}>
          <HiXMark />
        </CloseButton>

        <div>
          {props.renderProps ? props.renderContent(close) : props.children}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

interface OpenProps {
  renderEl: (open: () => void) => React.ReactNode;
  opens: string;
}

function Open({ renderEl, opens: opensWindowName }: OpenProps) {
  const { open } = useModal();

  return renderEl(() => open(opensWindowName));
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;

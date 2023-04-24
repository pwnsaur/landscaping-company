import styled from 'styled-components';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  message: string;
  isError: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, message, isError, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  return (
    <ModalContainer $isOpen={isOpen} $isError={isError}>
      <Message>{message}</Message>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{ $isOpen: boolean; $isError: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: ${({ theme, $isError }) =>
    $isError ? theme.colors.error : theme.colors.success};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  z-index: 5;
`;

const Message = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export default Modal;

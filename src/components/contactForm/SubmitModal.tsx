import { useEffect } from 'react';
import styled from 'styled-components';

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
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(32rem, calc(100vw - 2rem));
  min-height: 3rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme, $isError }) =>
    $isError ? theme.colors.error : theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.errorBorder : theme.colors.successBorder};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  z-index: 7;
`;

const Message = styled.p`
  font-size: 0.95rem;
  line-height: 1.35;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  text-align: center;
`;

export default Modal;

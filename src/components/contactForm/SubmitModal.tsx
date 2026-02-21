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
      }, 4200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  return (
    <ModalContainer
      $isOpen={isOpen}
      $isError={isError}
      aria-hidden={!isOpen}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
    >
      <Message>{message}</Message>
      <CloseButton type='button' onClick={onClose} aria-label='Aizvērt paziņojumu'>
        ×
      </CloseButton>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{ $isOpen: boolean; $isError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  position: fixed;
  bottom: ${({ theme }) => theme.components.overlay.toastBottomOffset};
  left: 50%;
  transform: translateX(-50%) translateY(${({ $isOpen }) => ($isOpen ? '0' : '0.5rem')});
  width: ${({ theme }) => theme.components.overlay.toastWidth};
  min-height: ${({ theme }) => theme.components.overlay.toastMinHeight};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs}`};
  background-color: ${({ theme, $isError }) =>
    $isError ? theme.colors.error : theme.colors.success};
  color: ${({ theme }) => theme.semantic.text.onAccent};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.errorBorder : theme.colors.successBorder};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition:
    opacity ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easing},
    transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easing};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.35;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  text-align: left;
  flex: 1;
`;

const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.lineOnDarkStrong};
  background: transparent;
  color: ${({ theme }) => theme.semantic.text.onAccent};
  border-radius: ${({ theme }) => theme.radii.full};
  width: 1.65rem;
  min-width: 1.65rem;
  height: 1.65rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
`;

export default Modal;

import { useEffect } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

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
  gap: ${theme.spacing.xs};
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $isOpen }) => ($isOpen ? '0' : '0.5rem')});
  width: min(32rem, calc(100vw - 2rem));
  min-height: 3rem;
  padding: ${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs};
  background-color: ${({ $isError }) => ($isError ? theme.colors.error : theme.colors.success)};
  color: ${theme.semantic.text.onAccent};
  border-radius: ${theme.radii.md};
  border: 1px solid
    ${({ $isError }) => ($isError ? theme.colors.errorBorder : theme.colors.successBorder)};
  box-shadow: ${theme.shadows.modal};
  z-index: ${theme.zIndex.overlay};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition:
    opacity ${theme.motion.fast} ${theme.motion.easing},
    transform ${theme.motion.fast} ${theme.motion.easing};
`;

const Message = styled.p`
  font-size: ${theme.fontSizes.normal};
  line-height: 1.35;
  font-weight: ${theme.fontWeights.bold};
  margin: 0;
  text-align: left;
  flex: 1;
`;

const CloseButton = styled.button`
  border: 1px solid ${theme.colors.lineOnDarkStrong};
  background: transparent;
  color: ${theme.semantic.text.onAccent};
  border-radius: ${theme.radii.full};
  width: 1.65rem;
  min-width: 1.65rem;
  height: 1.65rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
`;

export default Modal;

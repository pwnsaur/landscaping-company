import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const FieldInput = styled.input`
  width: 100%;
  min-height: ${theme.components.form.fieldMinHeight};
  padding: ${theme.components.form.fieldPadding};
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.glowSoft};
  font-size: ${theme.fontSizes.normal};
  line-height: 1.4;
  outline: none;
  transition:
    border-color ${theme.motion.fast} ${theme.motion.easing},
    box-shadow ${theme.motion.fast} ${theme.motion.easing};

  &:focus {
    border-color: ${theme.colors.darkGreen};
    box-shadow: 0 0 0 ${theme.components.form.focusRingWidth}
      ${theme.semantic.interactive.focusRing};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.colors.error};
    box-shadow: 0 0 0 ${theme.components.form.focusRingWidth}
      rgba(142, 32, 32, 0.16);
  }

  ::placeholder {
    color: ${theme.semantic.text.muted};
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: ${theme.components.form.textareaMinHeight};
  padding: ${theme.components.form.fieldPadding};
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.glowSoft};
  font-size: ${theme.fontSizes.normal};
  line-height: 1.55;
  resize: none;
  outline: none;
  transition:
    border-color ${theme.motion.fast} ${theme.motion.easing},
    box-shadow ${theme.motion.fast} ${theme.motion.easing};

  &:focus {
    border-color: ${theme.colors.darkGreen};
    box-shadow: 0 0 0 ${theme.components.form.focusRingWidth}
      ${theme.semantic.interactive.focusRing};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.colors.error};
    box-shadow: 0 0 0 ${theme.components.form.focusRingWidth}
      rgba(142, 32, 32, 0.16);
  }

  ::placeholder {
    color: ${theme.semantic.text.muted};
  }
`;

export const PrimaryButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  min-width: ${theme.components.form.buttonMinWidth};
  text-transform: uppercase;
  letter-spacing: ${theme.components.form.buttonTracking};
  background-color: ${theme.colors.darkGreen};
  color: ${theme.semantic.text.onAccent};
  border: 1px solid ${theme.colors.darkGreen};
  border-radius: ${theme.radii.sm};
  box-shadow: ${theme.shadows.soft};
  font-size: ${theme.fontSizes.normal};
  font-weight: ${theme.fontWeights.bold};
  transition:
    background-color ${theme.motion.normal} ${theme.motion.easing},
    color ${theme.motion.normal} ${theme.motion.easing},
    transform ${theme.motion.normal} ${theme.motion.easing};
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    background-color: transparent;
    color: ${theme.colors.darkGreen};
  }

  &:disabled {
    transform: none;
    background-color: ${theme.semantic.interactive.disabled};
    border-color: ${theme.semantic.interactive.disabledBorder};
    color: ${theme.colors.grey};
    cursor: not-allowed;
  }
`;

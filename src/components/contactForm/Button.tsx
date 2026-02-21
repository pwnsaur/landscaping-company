import { PrimaryButton } from '@/components/ui/form/primitives';

type ButtonProps = {
  type: 'submit';
  children: React.ReactNode;
  disabled: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const Button = ({ children, type, disabled, isLoading, onClick }: ButtonProps) => {
  return (
    <PrimaryButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={isLoading}
    >
      {children}
    </PrimaryButton>
  );
};

export default Button;

import { PrimaryButton } from '@/components/ui/form/primitives';

type ButtonProps = {
  type: 'submit';
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
};

const Button = ({ children, type, disabled, onClick }: ButtonProps) => {
  return (
    <PrimaryButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </PrimaryButton>
  );
};

export default Button;

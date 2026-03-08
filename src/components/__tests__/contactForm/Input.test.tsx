import { ChangeEvent } from 'react';

import Input from '@/components/contactForm/Input';
import { render, screen } from '@/utils/test-utils';

describe('Input component', () => {
  test('renders an accessible field with linked validation messaging', () => {
    render(
      <Input
        id='email'
        type='email'
        label='E-pasts'
        value=''
        placeholder='E-pasts'
        onChange={function (_event: ChangeEvent<HTMLInputElement>): void {}}
        error='Nepareizs e-pasts'
      />
    );

    const input = screen.getByLabelText('E-pasts');
    const error = screen.getByText('Nepareizs e-pasts');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(error).toHaveAttribute('id', 'email-error');
  });
});

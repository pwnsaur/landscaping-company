import { ChangeEvent } from 'react';

import Textarea from '@/components/contactForm/Textarea';
import { render, screen } from '@/utils/test-utils';

describe('Textarea component', () => {
  test('renders the counter and links error messaging accessibly', () => {
    render(
      <Textarea
        id='message'
        label='Ziņojums'
        value='Labdien'
        placeholder='Jūsu ziņojums'
        onChange={function (_event: ChangeEvent<HTMLTextAreaElement>): void {}}
        maxLength={1500}
        error='Lauks ir obligāts'
      />
    );

    const textarea = screen.getByLabelText('Ziņojums');
    const error = screen.getByText('Lauks ir obligāts');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-error');
    expect(error).toHaveAttribute('id', 'message-error');
    expect(screen.getByText('7/1500')).toBeInTheDocument();
  });
});

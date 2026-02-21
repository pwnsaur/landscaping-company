import { ChangeEvent } from 'react';

import Input from '@/components/contactForm/Input';
import { render } from '@/utils/test-utils';

describe('Input component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Input
        id='email'
        type='email'
        label='E-pasts'
        value=''
        placeholder='E-pasts'
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        }}
        error=''
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

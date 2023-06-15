import { ChangeEvent } from 'react';

import Input from '@/components/contactForm/Input';
import { render } from '@/utils/test-utils';

describe('Input component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Input
        id={''}
        type={''}
        value={''}
        placeholder={''}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

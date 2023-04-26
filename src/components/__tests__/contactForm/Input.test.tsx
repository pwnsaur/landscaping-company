import { render } from '@/utils/test-utils';
import Input from '@/components/contactForm/Input';
import { ChangeEvent } from 'react';

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

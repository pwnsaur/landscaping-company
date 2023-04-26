import { render } from '@/utils/test-utils';
import Textarea from '@/components/contactForm/Textarea';
import { ChangeEvent } from 'react';

describe('Textarea component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Textarea
        id={''}
        value={''}
        placeholder={''}
        onChange={function (event: ChangeEvent<HTMLTextAreaElement>): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

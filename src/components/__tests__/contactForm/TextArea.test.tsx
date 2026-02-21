import { ChangeEvent } from 'react';

import Textarea from '@/components/contactForm/Textarea';
import { render } from '@/utils/test-utils';

describe('Textarea component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Textarea
        id='message'
        label='Ziņojums'
        value=''
        placeholder='Jūsu ziņojums'
        onChange={function (event: ChangeEvent<HTMLTextAreaElement>): void {
          throw new Error('Function not implemented.');
        }}
        maxLength={1500}
        error=''
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

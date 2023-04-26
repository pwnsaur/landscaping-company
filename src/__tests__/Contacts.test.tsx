import { render } from '@/utils/test-utils';
import Contacts from '@/pages/contacts';

describe('Contacts Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Contacts />);
    expect(asFragment()).toMatchSnapshot();
  });
});

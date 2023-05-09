import Contacts from '@/pages/contacts';
import { render } from '@/utils/test-utils';

describe('Contacts Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Contacts />);
    expect(asFragment()).toMatchSnapshot();
  });
});

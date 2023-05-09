import ContactForm from '@/components/contactForm/ContactForm';
import { render } from '@/utils/test-utils';

describe('ContactForm component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

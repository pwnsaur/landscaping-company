import { render } from '@/utils/test-utils';
import ContactForm from '@/components/contactForm/ContactForm';

describe('ContactForm component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

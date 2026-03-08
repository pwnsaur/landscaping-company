import ContactsPageClient from '@/app/contacts/page-client';
import { render, screen } from '@/utils/test-utils';

const mockProvider = jest.fn(
  ({
    children,
    reCaptchaKey,
  }: {
    children: React.ReactNode;
    reCaptchaKey: string;
  }) => (
    <div data-testid='recaptcha-provider' data-key={reCaptchaKey}>
      {children}
    </div>
  )
);

jest.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: (props: {
    children: React.ReactNode;
    reCaptchaKey: string;
  }) => mockProvider(props),
}));

jest.mock('../../components/contactForm/ContactForm', () => {
  return function MockContactForm() {
    return <div data-testid='contact-form'>contact form</div>;
  };
});

describe('ContactsPageClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the contact form when a reCAPTCHA key is provided', () => {
    render(<ContactsPageClient recaptchaKey='public-site-key' />);

    expect(screen.getByTestId('recaptcha-provider')).toHaveAttribute(
      'data-key',
      'public-site-key'
    );
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.queryByText(/Trūkst reCAPTCHA atslēga/i)).not.toBeInTheDocument();
  });

  test('renders the missing key state when no reCAPTCHA key is provided', () => {
    render(<ContactsPageClient />);

    expect(screen.getByText(/Trūkst reCAPTCHA atslēga/i)).toBeInTheDocument();
    expect(screen.queryByTestId('recaptcha-provider')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument();
  });
});

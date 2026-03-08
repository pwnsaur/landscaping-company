import ContactForm from '@/components/contactForm/ContactForm';
import { fireEvent, render, screen, waitFor } from '@/utils/test-utils';

import { submitEmail } from '../../../utils/submitEmail';

const mockExecuteRecaptcha = jest.fn();

jest.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: mockExecuteRecaptcha,
  }),
}));

jest.mock('../../../utils/submitEmail', () => ({
  submitEmail: jest.fn(),
}));

const mockedSubmitEmail = jest.mocked(submitEmail);

const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Vārds'), {
    target: { value: 'Kaspars Mjaisans' },
  });
  fireEvent.change(screen.getByLabelText('E-pasts'), {
    target: { value: 'kaspars@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Tālrunis'), {
    target: { value: '+37126550185' },
  });
  fireEvent.change(screen.getByLabelText('Ziņojums'), {
    target: { value: 'Vēlos sakopt pagalmu un ieplānot nākamos darbus.' },
  });
};

const submitForm = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'Sūtīt' }));

  await waitFor(() => {
    expect(mockedSubmitEmail).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Sūtīt' })).toBeEnabled();
  });
};

describe('ContactForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockExecuteRecaptcha.mockResolvedValue('recaptcha-token');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the core fields and submit action', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('Vārds')).toBeInTheDocument();
    expect(screen.getByLabelText('E-pasts')).toBeInTheDocument();
    expect(screen.getByLabelText('Tālrunis')).toBeInTheDocument();
    expect(screen.getByLabelText('Ziņojums')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sūtīt' })).toBeEnabled();
  });

  test('keeps the original form start time after a failed submit', async () => {
    let now = 1000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
    mockedSubmitEmail.mockResolvedValue({
      isSuccessful: false,
      message: 'Ziņojumu neizdevās nosūtīt.',
    });

    render(<ContactForm />);

    fillForm();
    await submitForm();
    now = 2000;
    await submitForm();

    expect(mockedSubmitEmail).toHaveBeenCalledTimes(2);
    expect(mockedSubmitEmail.mock.calls[0][0].formStartedAt).toBe(1000);
    expect(mockedSubmitEmail.mock.calls[1][0].formStartedAt).toBe(1000);
  });

  test('resets the form start time after a successful submit', async () => {
    let now = 1000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
    mockedSubmitEmail.mockImplementation(async () => {
      now = 2000;
      return {
        isSuccessful: true,
        message: 'Ziņojums nosūtīts.',
      };
    });

    render(<ContactForm />);

    fillForm();
    await submitForm();
    fillForm();
    await submitForm();

    expect(mockedSubmitEmail).toHaveBeenCalledTimes(2);
    expect(mockedSubmitEmail.mock.calls[0][0].formStartedAt).toBe(1000);
    expect(mockedSubmitEmail.mock.calls[1][0].formStartedAt).toBe(2000);
  });
});

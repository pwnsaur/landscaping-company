import { render } from '@/utils/test-utils';
import Navigation from '@/components/navigation/Navigation';

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

describe('Navigation component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Navigation />);
    expect(asFragment()).toMatchSnapshot();
  });
});

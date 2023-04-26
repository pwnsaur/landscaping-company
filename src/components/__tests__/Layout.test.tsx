import { render } from '@/utils/test-utils';
import Layout from '@/components/Layout';

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

describe('Layout component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Layout>
        <div>Would you test me? Id test me.</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

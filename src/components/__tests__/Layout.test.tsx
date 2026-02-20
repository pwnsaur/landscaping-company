import Layout from '@/components/Layout';
import { render } from '@/utils/test-utils';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
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

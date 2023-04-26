import { render } from '@/utils/test-utils';
import Projects from '@/pages/projects';

describe('Projects Page', () => {
  test('matches the snapshot without data', () => {
    const { asFragment } = render(<Projects projects={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

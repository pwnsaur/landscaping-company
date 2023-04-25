import { render } from '@/utils/test-utils';
import Project from '@/pages/projects';

describe('Project Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Project projects={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import 'jest-styled-components';

import { createMockProject } from '@/components/__mocks__/mockProject';
import Project, {
  getStaticPaths,
  getStaticProps,
} from '@/pages/projects/[slug]';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { render } from '@/utils/test-utils';

jest.mock('../../utils/hooks/useIsMobile');

const mockProject = createMockProject();

describe('Project page', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<Project project={mockProject} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have correct styling for desktop', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);

    const { container } = render(<Project project={mockProject} />);
    const projectContainer = container.firstChild;
    expect(projectContainer).toHaveStyleRule('width', '70%');
  });

  test('should have correct styling for mobile', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    const { container } = render(<Project project={mockProject} />);
    const projectContainer = container.firstChild;
    expect(projectContainer).toHaveStyleRule('width', '100%');
  });

  test('should export getStaticPaths function', () => {
    expect(getStaticPaths).toBeDefined();
  });

  test('should export getStaticProps function', () => {
    expect(getStaticProps).toBeDefined();
  });
});

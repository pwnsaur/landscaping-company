import { createMockProject } from '@/components/__mocks__/mockProject';
import Projects, { getServerSideProps } from '@/pages/projects';
import { TypeProject } from '@/types/contentfulTypes';
import { render } from '@/utils/test-utils';

const mockProject = createMockProject();
const mockProjects: TypeProject[] = [mockProject];

describe('Projects page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Projects projects={mockProjects} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should export getStaticProps function', () => {
    expect(getServerSideProps).toBeDefined();
  });
});

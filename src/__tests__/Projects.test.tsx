import { render } from '@testing-library/react';
import { TypeProject } from '@/types/contentfulTypes';
import Projects, { getStaticProps } from '@/pages/projects';
import { createMockProject } from '@/components/__mocks__/mockProject';

const mockProject = createMockProject();
const mockProjects: TypeProject[] = [mockProject];

describe('Projects page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Projects projects={mockProjects} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should export getStaticProps function', () => {
    expect(getStaticProps).toBeDefined();
  });
});

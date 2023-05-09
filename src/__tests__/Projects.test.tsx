import { render } from '@testing-library/react';

import { createMockProject } from '@/components/__mocks__/mockProject';
import Projects, { getStaticProps } from '@/pages/projects';
import { TypeProject } from '@/types/contentfulTypes';

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

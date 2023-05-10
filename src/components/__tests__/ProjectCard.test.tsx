import React from 'react';

import { createMockProject } from '@/components/__mocks__/mockProject';
import ProjectCard from '@/components/ProjectCard';
import { render } from '@/utils/test-utils';

const mockProject = createMockProject();

describe('ProjectCard', () => {
  test('renders correctly', () => {
    const { getByText, asFragment } = render(
      <ProjectCard project={mockProject} priority={false} />
    );

    expect(getByText(mockProject.fields.title)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});

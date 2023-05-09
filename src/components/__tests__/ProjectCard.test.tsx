import { render } from '@testing-library/react';
import React from 'react';

import { createMockProject } from '@/components/__mocks__/mockProject';
import ProjectCard from '@/components/ProjectCard';

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

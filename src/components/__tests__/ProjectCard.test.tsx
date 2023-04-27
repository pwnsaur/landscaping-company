import React from 'react';
import { render } from '@testing-library/react';
import { createMockProject } from '../__mocks__/mockProject';
import ProjectCard from '@/components/ProjectCard';
import renderer from 'react-test-renderer';

const mockProject = createMockProject();

describe('ProjectCard', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ProjectCard project={mockProject} priority={false} />
    );

    expect(getByText(mockProject.fields.title)).toBeInTheDocument();

    const tree = renderer
      .create(<ProjectCard project={mockProject} priority={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { createMockService } from '../__mocks__/mockService';
import ServiceCard from '@/components/ServiceCard';
import renderer from 'react-test-renderer';

const mockProject = createMockService();

describe('ServiceCard', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ServiceCard service={mockProject} priority={false} />
    );

    expect(getByText(mockProject.fields.title)).toBeInTheDocument();

    if (mockProject.fields.excerpt) {
      expect(getByText(mockProject.fields.excerpt)).toBeInTheDocument();
    }

    const tree = renderer
      .create(<ServiceCard service={mockProject} priority={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

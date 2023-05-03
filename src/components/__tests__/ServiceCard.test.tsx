import React from 'react';
import { render } from '@testing-library/react';
import { createMockService } from '@/components/__mocks__/mockService';
import ServiceCard from '@/components/ServiceCard';

const mockService = createMockService();

describe('ServiceCard', () => {
  test('renders correctly', () => {
    const { getByText, asFragment } = render(
      <ServiceCard service={mockService} priority={false} />
    );

    expect(getByText(mockService.fields.title)).toBeInTheDocument();

    if (mockService.fields.excerpt) {
      expect(getByText(mockService.fields.excerpt)).toBeInTheDocument();
    }

    expect(asFragment()).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react';

import { createMockService } from '@/components/__mocks__/mockService';
import Services, { getStaticProps } from '@/pages/services';
import { TypeService } from '@/types/contentfulTypes';

const mockService = createMockService();
const mockServices: TypeService[] = [mockService];

describe('Projects page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Services services={mockServices} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should export getStaticProps function', () => {
    expect(getStaticProps).toBeDefined();
  });
});

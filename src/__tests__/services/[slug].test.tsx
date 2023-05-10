import 'jest-styled-components';

import { createMockService } from '@/components/__mocks__/mockService';
import Service, {
  getStaticPaths,
  getStaticProps,
} from '@/pages/services/[slug]';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { render } from '@/utils/test-utils';

jest.mock('../../utils/hooks/useIsMobile');

const mockService = createMockService();

describe('Service page', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<Service service={mockService} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have correct styling for desktop', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);

    const { container } = render(<Service service={mockService} />);
    const projectContainer = container.firstChild;
    expect(projectContainer).toHaveStyleRule('width', '70%');
  });

  test('should have correct styling for mobile', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    const { container } = render(<Service service={mockService} />);
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

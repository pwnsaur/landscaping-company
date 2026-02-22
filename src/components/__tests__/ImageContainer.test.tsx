import ImageContainer from '@/components/ImageContainer';
import { fireEvent, render, screen } from '@/utils/test-utils';

import { createMockAsset } from '../__mocks__/mockAsset';

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const mockImage = createMockAsset();
const mockImages = [
  mockImage,
  { ...mockImage, sys: { ...mockImage.sys, id: '2' } },
];

describe('ImageContainer component', () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<ImageContainer images={mockImages} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders images', () => {
    render(<ImageContainer images={mockImages} />);
    expect(screen.getAllByAltText('project image')).toHaveLength(2);
  });

  test('clicking on an image on a hover-capable device zooms it', () => {
    mockMatchMedia(true);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    expect(screen.getByAltText('zoomed image')).toBeInTheDocument();
  });

  test("clicking on an image on a touch-only device doesn't zoom it", () => {
    mockMatchMedia(false);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    expect(screen.queryByAltText('zoomed image')).not.toBeInTheDocument();
  });

  test('clicking on the zoomed image closes it', () => {
    mockMatchMedia(true);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    fireEvent.click(screen.getByAltText('zoomed image'));
    expect(screen.queryByAltText('zoomed image')).not.toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@/utils/test-utils';
import ImageContainer from '@/components/ImageContainer';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { createMockAsset } from '../__mocks__/mockAsset';

jest.mock('../../utils/hooks/useIsMobile', () => jest.fn());

const mockImage = createMockAsset();
const mockImages = [
  mockImage,
  { ...mockImage, sys: { ...mockImage.sys, id: '2' } },
];

describe('ImageContainer component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<ImageContainer images={mockImages} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders images', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
    render(<ImageContainer images={mockImages} />);
    expect(screen.getAllByAltText('project image')).toHaveLength(2);
  });

  test('clicking on an image when isMobile===false zooms it', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    expect(screen.getByAltText('zoomed image')).toBeInTheDocument();
  });

  test("clicking on an image when isMobile===true doesn't zoom it", () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    expect(screen.queryByAltText('zoomed image')).not.toBeInTheDocument();
  });

  test('clcking on the image closes it', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
    render(<ImageContainer images={[mockImage]} />);
    fireEvent.click(screen.getByAltText('project image'));
    fireEvent.click(screen.getByAltText('zoomed image'));
    expect(screen.queryByAltText('zoomed image')).not.toBeInTheDocument();
  });
});

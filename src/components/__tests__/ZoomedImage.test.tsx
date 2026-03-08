import ZoomedImage from '@/components/ZoomedImage';
import { fireEvent, render, screen } from '@/utils/test-utils';

describe('ZoomedImage component', () => {
  const defaultProps = {
    src: 'https://meow.com',
    alt: 'meow',
    width: 1200,
    height: 800,
    close: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    zoomedImageIndex: 1,
    imagesLength: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<ZoomedImage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders explicit navigation and close controls', () => {
    render(<ZoomedImage {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Previous image' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next image' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close zoomed image' })).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  test('close button closes the overlay', () => {
    render(<ZoomedImage {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close zoomed image' }));

    expect(defaultProps.close).toHaveBeenCalledTimes(1);
  });

  test('navigation buttons trigger the correct callbacks', () => {
    render(<ZoomedImage {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));

    expect(defaultProps.previous).toHaveBeenCalledTimes(1);
    expect(defaultProps.next).toHaveBeenCalledTimes(1);
  });

  test('edge navigation buttons are disabled', () => {
    render(
      <ZoomedImage {...defaultProps} zoomedImageIndex={0} imagesLength={1} />
    );

    expect(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next image' })).toBeDisabled();
  });
});

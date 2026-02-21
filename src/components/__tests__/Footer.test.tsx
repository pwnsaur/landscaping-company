import Footer from '@/components/Footer';
import { render, screen } from '@/utils/test-utils';

describe('Footer Component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Footer copyright', () => {
  test('text is correct', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`Copyright ${currentYear} Brasika`, 'i')
    );
    expect(copyrightText).toBeInTheDocument();
  });
});

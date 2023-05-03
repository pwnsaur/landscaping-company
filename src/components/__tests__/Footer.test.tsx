import { render, screen } from '@/utils/test-utils';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Footer copyright', () => {
  test('text is correct', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Copyright 2023 Hackerman/i);
    expect(copyrightText).toBeInTheDocument();
  });
});

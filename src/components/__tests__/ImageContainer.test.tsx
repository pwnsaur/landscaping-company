import { render } from '@/utils/test-utils';
import ImageContainer from '@/components/ImageContainer';

describe('ImageContainer component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<ImageContainer images={undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

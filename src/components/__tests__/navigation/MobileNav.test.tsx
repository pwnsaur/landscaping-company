import MobileNav from '@/components/navigation/MobileNav';
import { render } from '@/utils/test-utils';

describe('MobileNav component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <MobileNav
        currentPath='/'
        isOpen={false}
        isVisible={true}
        onClose={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

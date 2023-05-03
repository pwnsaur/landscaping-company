import { render } from '@/utils/test-utils';
import MobileNav from '@/components/navigation/MobileNav';

describe('MobileNav component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <MobileNav isOpen={false} isVisible={true} handleItemClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

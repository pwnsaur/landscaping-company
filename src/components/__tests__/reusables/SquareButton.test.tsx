import { render } from '@/utils/test-utils';
import SquareButton from '@/components/reusables/SquareButton';

describe('SquareButton component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <SquareButton name={''} destination={'services'} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

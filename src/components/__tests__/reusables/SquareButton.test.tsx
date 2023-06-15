import SquareButton from '@/components/reusables/SquareButton';
import { render } from '@/utils/test-utils';

describe('SquareButton component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <SquareButton name={'podziņa'} destination={'services'} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

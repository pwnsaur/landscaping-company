import Home from '@/pages/index';
import { render } from '@/utils/test-utils';

describe('Home Page', () => {
  xtest('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});

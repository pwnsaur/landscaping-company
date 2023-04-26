import { render } from '@/utils/test-utils';
import Button from '@/components/contactForm/Button';

describe('Button component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Button type={'submit'} disabled={false}>
        Click me!
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

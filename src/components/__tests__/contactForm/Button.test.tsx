import Button from '@/components/contactForm/Button';
import { render } from '@/utils/test-utils';

describe('Button component', () => {
  test('matches the snapshot for enabled state', () => {
    const { asFragment } = render(
      <Button type={'submit'} disabled={false}>
        Click me!
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

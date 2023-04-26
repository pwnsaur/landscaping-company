import { render } from '@/utils/test-utils';
import ZoomedImage from '@/components/ZoomedImage';

describe('ZoomedImage component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <ZoomedImage
        src={'https://meow.com'}
        alt={'meow'}
        width={0}
        height={0}
        close={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

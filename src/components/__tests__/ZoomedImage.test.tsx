import ZoomedImage from '@/components/ZoomedImage';
import { render } from '@/utils/test-utils';

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
        previous={function (): void {
          throw new Error('Function not implemented.');
        }}
        next={function (): void {
          throw new Error('Function not implemented.');
        }}
        zoomedImageIndex={0}
        imagesLength={0}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

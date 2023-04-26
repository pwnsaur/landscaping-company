import { render } from '@/utils/test-utils';
import SubmitModal from '@/components/contactForm/SubmitModal';

describe('SubmitModal component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <SubmitModal
        isOpen={false}
        message={''}
        isError={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import SubmitModal from '@/components/contactForm/SubmitModal';
import { render } from '@/utils/test-utils';

describe('SubmitModal component', () => {
  test('matches the snapshot on success', () => {
    const { asFragment } = render(
      <SubmitModal
        isOpen={true}
        message={''}
        isError={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches the snapshot snapshot on error', () => {
    const { asFragment } = render(
      <SubmitModal
        isOpen={true}
        message={''}
        isError={true}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

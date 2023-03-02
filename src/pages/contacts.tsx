import { NextSeo } from 'next-seo';

type Props = {};

const Contact = (props: Props) => {
  return (
    <>
      <NextSeo
        title='Kontakti'
        titleTemplate='Brasika | %s'
        description='Kontakti'
      />
      <div>Contact</div>
    </>
  );
};

export default Contact;

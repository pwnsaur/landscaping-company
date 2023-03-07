import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <main>Sākums</main>

      <style jsx>{`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 6rem;
        height: 100%;
      `}</style>
    </>
  );
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 50000);
  });

  return (
    <div className='not-found'>
      <h1>404</h1>
      <p>Redirecting to home...</p>

      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

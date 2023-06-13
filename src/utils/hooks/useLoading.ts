import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(router.pathname === '/');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading) {
      timeout = setTimeout(() => setLoading(false), 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading]);

  return loading;
};

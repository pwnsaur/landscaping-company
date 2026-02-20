import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useLoading = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === '/');

  useEffect(() => {
    if (pathname !== '/') {
      setLoading(false);
      return;
    }

    let timeout: NodeJS.Timeout;
    setLoading(true);

    if (loading) {
      timeout = setTimeout(() => setLoading(false), 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading, pathname]);

  return loading;
};

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const SPLASH_DURATION_MS = 1000;

export const useLoading = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const hasDecided = useRef(false);

  useEffect(() => {
    if (hasDecided.current) {
      return;
    }

    hasDecided.current = true;

    // Show the splash only when the initial route is home.
    if (pathname !== '/') {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return loading;
};

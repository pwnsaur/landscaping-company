import { useEffect, useState } from 'react';

import { theme } from '@/styles/theme';

const MOBILE_QUERY = `(max-width: ${theme.breakpoints.tablet})`;

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateMatch = () => setIsMobile(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  return isMobile;
};

export default useIsMobile;

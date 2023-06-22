import { useEffect, useState } from 'react';

import { isMobileUserAgent } from '@utils/userAgent';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const isMobileClient = isMobileUserAgent(userAgent);
      setIsMobile(isMobileClient);
    }
  }, []);

  return isMobile;
};

export default useIsMobile;

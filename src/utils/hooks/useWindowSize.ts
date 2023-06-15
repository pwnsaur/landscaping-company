import { useEffect, useState } from 'react';

interface WindowSize {
  width: number | undefined;
}

function useWindowSize(initialWindowSize?: WindowSize): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(
    initialWindowSize || {
      width: undefined,
    }
  );

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;

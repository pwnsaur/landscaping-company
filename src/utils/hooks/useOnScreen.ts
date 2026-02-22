import { RefObject, useEffect, useState } from 'react';

const THRESHOLD = 0.1;

const useOnScreen = (ref: RefObject<HTMLElement | null>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold: THRESHOLD,
        rootMargin: '500px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return isIntersecting;
};

export default useOnScreen;

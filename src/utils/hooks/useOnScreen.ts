import { RefObject, useEffect, useState } from 'react';

const useOnScreen = (ref: RefObject<HTMLElement>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);
  const threshold = 0.1;

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '300px',
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
  }, [ref, threshold]);

  return isIntersecting;
};

export default useOnScreen;

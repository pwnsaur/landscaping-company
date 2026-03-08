import { useEffect } from 'react';

type UseBodyScrollLockOptions = {
  reserveScrollbarGap?: boolean;
};

const useBodyScrollLock = (
  locked: boolean,
  { reserveScrollbarGap = true }: UseBodyScrollLockOptions = {}
) => {
  useEffect(() => {
    if (!locked || typeof window === 'undefined') {
      return;
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';

    if (reserveScrollbarGap) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        const computedPaddingRight = Number.parseFloat(
          window.getComputedStyle(body).paddingRight
        );
        const nextPaddingRight = (Number.isNaN(computedPaddingRight) ? 0 : computedPaddingRight) + scrollbarWidth;

        body.style.paddingRight = `${nextPaddingRight}px`;
      }
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked, reserveScrollbarGap]);
};

export default useBodyScrollLock;

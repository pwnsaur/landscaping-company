import { useMemo, useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

const createSnapshotReader = (query: string) => () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(query).matches;
};

const createMediaQuerySubscriber = (query: string) => (onStoreChange: () => void) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(query);

  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', onStoreChange);

    return () => {
      mediaQueryList.removeEventListener('change', onStoreChange);
    };
  }

  mediaQueryList.addListener(onStoreChange);

  return () => {
    mediaQueryList.removeListener(onStoreChange);
  };
};

const useMediaQuery = (query: string) => {
  const subscribe = useMemo(() => createMediaQuerySubscriber(query), [query]);
  const getSnapshot = useMemo(() => createSnapshotReader(query), [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useMediaQuery;

import useWindowSize from '@utils/hooks/useWindowSize';

const useIsMobile = (): boolean => {
  const { width } = useWindowSize();
  if (width === undefined) return false;
  const isMobile = width <= 666;

  return isMobile;
};

export default useIsMobile;

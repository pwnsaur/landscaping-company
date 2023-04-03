import useWindowSize from '@utils/hooks/useWindowSize';

const useIsMobile = (): boolean => {
  const { width } = useWindowSize();
  const isMobile = (width || 1920) <= 666;

  return isMobile;
};

export default useIsMobile;

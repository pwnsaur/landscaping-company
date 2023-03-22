import useWindowSize from './useWindowSize';

const useIsMobile = (): boolean => {
  const { width, height } = useWindowSize();
  const currentWidth = width || 0;
  const currentHeight = height || 0;
  const isMobile = currentWidth <= 640;

  return isMobile;
};

export default useIsMobile;

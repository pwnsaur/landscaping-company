import useWindowSize from './useWindowSize';

type DeviceType = {
  isOnMobile: boolean;
  isOnDesktop: boolean;
};

const useDeviceType = (): DeviceType => {
  const { width, height } = useWindowSize();
  const currentWidth = width || 0;
  const currentHeight = height || 0;

  const isOnMobile = currentWidth <= 640;
  const isOnDesktop = currentWidth > 640;

  return { isOnMobile, isOnDesktop };
};

export default useDeviceType;

import { theme } from '@/styles/theme';
import useMediaQuery from '@/utils/hooks/useMediaQuery';

const MOBILE_QUERY = `(max-width: ${theme.breakpoints.tablet})`;

const useIsMobile = (): boolean => useMediaQuery(MOBILE_QUERY);

export default useIsMobile;

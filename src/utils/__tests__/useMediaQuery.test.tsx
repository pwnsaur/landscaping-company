import { theme } from '@/styles/theme';
import useIsMobile from '@/utils/hooks/useIsMobile';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { act, renderHook } from '@/utils/test-utils';

type MediaQueryListener = () => void;

const mediaQueryListeners = new Map<string, Set<MediaQueryListener>>();
const mediaQueryMatches = new Map<string, boolean>();

const registerListener = (query: string, listener: MediaQueryListener) => {
  const listeners = mediaQueryListeners.get(query) ?? new Set<MediaQueryListener>();
  listeners.add(listener);
  mediaQueryListeners.set(query, listeners);
};

const unregisterListener = (query: string, listener: MediaQueryListener) => {
  mediaQueryListeners.get(query)?.delete(listener);
};

const setMediaQueryMatch = (query: string, matches: boolean) => {
  mediaQueryMatches.set(query, matches);
  mediaQueryListeners.get(query)?.forEach((listener) => listener());
};

const installMatchMediaMock = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      get matches() {
        return mediaQueryMatches.get(query) ?? false;
      },
      media: query,
      onchange: null,
      addEventListener: (_event: 'change', listener: MediaQueryListener) => {
        registerListener(query, listener);
      },
      removeEventListener: (_event: 'change', listener: MediaQueryListener) => {
        unregisterListener(query, listener);
      },
      addListener: (listener: MediaQueryListener) => {
        registerListener(query, listener);
      },
      removeListener: (listener: MediaQueryListener) => {
        unregisterListener(query, listener);
      },
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('useMediaQuery', () => {
  beforeEach(() => {
    mediaQueryListeners.clear();
    mediaQueryMatches.clear();
    installMatchMediaMock();
  });

  test('returns the current media query match', () => {
    const query = '(hover: hover)';
    mediaQueryMatches.set(query, true);

    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);
  });

  test('updates when the media query match changes', () => {
    const query = '(prefers-reduced-motion: reduce)';
    mediaQueryMatches.set(query, false);

    const { result } = renderHook(() => useMediaQuery(query));

    act(() => {
      setMediaQueryMatch(query, true);
    });

    expect(result.current).toBe(true);
  });
});

describe('useIsMobile', () => {
  beforeEach(() => {
    mediaQueryListeners.clear();
    mediaQueryMatches.clear();
    installMatchMediaMock();
  });

  test('tracks the shared tablet breakpoint query', () => {
    const mobileQuery = `(max-width: ${theme.breakpoints.tablet})`;
    mediaQueryMatches.set(mobileQuery, false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      setMediaQueryMatch(mobileQuery, true);
    });

    expect(result.current).toBe(true);
  });
});

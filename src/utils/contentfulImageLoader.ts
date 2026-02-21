import type { ImageLoaderProps } from 'next/image';

const DEFAULT_QUALITY = 65;

export const contentfulImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  try {
    const url = new URL(src);
    const resolvedQuality = quality ?? DEFAULT_QUALITY;

    // `next/image` expects custom loaders to use `width`.
    if (url.hostname !== 'images.ctfassets.net') {
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', String(resolvedQuality));
      return url.toString();
    }

    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(resolvedQuality));
    url.searchParams.set('fm', 'webp');

    return url.toString();
  } catch {
    return src;
  }
};

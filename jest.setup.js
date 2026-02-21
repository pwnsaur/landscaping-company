import '@testing-library/jest-dom';
import 'jest-styled-components';
import 'intersection-observer';

import dotenv from 'dotenv';
import { createElement } from 'react';

dotenv.config({ path: '.env.local', quiet: true });

jest.mock('next/image', () => {
  return function MockNextImage({ alt, src, ...props }) {
    const normalizedSrc =
      typeof src === 'string'
        ? src
        : src && typeof src === 'object' && 'src' in src
          ? src.src
          : '';

    delete props.fill;
    delete props.priority;
    delete props.quality;
    delete props.placeholder;
    delete props.blurDataURL;
    delete props.loader;
    delete props.unoptimized;

    return createElement('img', {
      alt,
      src: normalizedSrc,
      ...props,
    });
  };
});

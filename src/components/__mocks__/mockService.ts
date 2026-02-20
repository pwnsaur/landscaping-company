import { BLOCKS } from '@contentful/rich-text-types';

import { TypeService } from '@/types/contentfulTypes';
import { createMockAsset } from '@components/__mocks__/mockAsset';


export const createMockService = (): TypeService => {
  return {
    sys: {
      id: '1',
      type: 'Entry',
      createdAt: '2023-04-27T12:00:00Z',
      updatedAt: '2023-04-27T12:00:00Z',
      contentType: {
        sys: {
          id: 'service',
        },
      },
    },
    fields: {
      title: 'Service',
      slug: 'service',
      excerpt: 'service',
      description: {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [],
      },
      coverImage: createMockAsset(),
    },
    metadata: {
      tags: [],
    },
  } as unknown as TypeService;
};

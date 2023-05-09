import { createMockAsset } from '@components/__mocks__/mockAsset';
import { BLOCKS } from '@contentful/rich-text-types';
import { Entry } from 'contentful';

import { TypeServiceFields } from '@/types/contentfulTypes';

export const createMockService = (): Entry<TypeServiceFields> => {
  return {
    sys: {
      id: '1',
      type: 'Entry',
      createdAt: '2023-04-27T12:00:00Z',
      updatedAt: '2023-04-27T12:00:00Z',
      locale: 'en-US',
      contentType: {
        sys: {
          id: 'service',
          type: 'Link',
          linkType: 'ContentType',
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
    toPlainObject: () => ({} as Entry<TypeServiceFields>),
    update: () => Promise.resolve({} as Entry<TypeServiceFields>),
  };
};

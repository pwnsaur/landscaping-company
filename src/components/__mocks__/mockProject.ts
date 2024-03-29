import { BLOCKS } from '@contentful/rich-text-types';
import { Entry } from 'contentful';

import { TypeProjectFields } from '@/types/contentfulTypes';
import { createMockAsset } from '@components/__mocks__/mockAsset';


export const createMockProject = (): Entry<TypeProjectFields> => {
  return {
    sys: {
      id: '1',
      type: 'Entry',
      createdAt: '2023-04-27T12:00:00Z',
      updatedAt: '2023-04-27T12:00:00Z',
      locale: 'en-US',
      contentType: {
        sys: {
          id: 'project',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    fields: {
      title: 'Fifteenth Project',
      slug: 'fifteenth-project',
      content: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [],
      },
      coverImage: createMockAsset(),
      date: '2023-04-27',
    },
    metadata: {
      tags: [],
    },
    toPlainObject: () => ({} as Entry<TypeProjectFields>),
    update: () => Promise.resolve({} as Entry<TypeProjectFields>),
  };
};

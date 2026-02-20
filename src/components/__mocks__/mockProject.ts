import { BLOCKS } from '@contentful/rich-text-types';

import { TypeProject } from '@/types/contentfulTypes';
import { createMockAsset } from '@components/__mocks__/mockAsset';


export const createMockProject = (): TypeProject => {
  return {
    sys: {
      id: '1',
      type: 'Entry',
      createdAt: '2023-04-27T12:00:00Z',
      updatedAt: '2023-04-27T12:00:00Z',
      contentType: {
        sys: {
          id: 'project',
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
  } as unknown as TypeProject;
};

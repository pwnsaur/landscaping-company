import { Asset } from 'contentful';

export const createMockAsset = (): Asset => {
  return {
    sys: {
      id: '1',
      type: 'Asset',
      createdAt: '2023-04-27T12:00:00Z',
      updatedAt: '2023-04-27T12:00:00Z',
      locale: 'en-US',
      contentType: {
        sys: {
          id: 'asset',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    fields: {
      title: 'jonathan-kemper-kYl3Yp2hwtQ-unsplash',
      description: '',
      file: {
        url: '//images.ctfassets.net/sandie-clarke-q13Zq1Jufks-unsplash.jpg',
        details: {
          size: 500939,
          image: {
            width: 1920,
            height: 1080,
          },
        },
        fileName: '',
        contentType: 'image/jpeg',
      },
    },
    metadata: {
      tags: [],
    },
    toPlainObject: () => ({} as Asset),
  };
};

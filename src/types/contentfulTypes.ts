import type { Asset, Entry, EntryFields } from 'contentful';

import type * as CFRichTextTypes from '@contentful/rich-text-types';

export interface TypeProjectFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  content: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  excerpt?: EntryFields.Symbol;
  coverImage: Asset;
  date: EntryFields.Date;
  images?: Asset[];
}

export type TypeProject = Entry<TypeProjectFields>;

export interface TypeServiceFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  description: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  excerpt?: EntryFields.Symbol;
  coverImage: Asset;
}

export type TypeService = Entry<TypeServiceFields>;

export type Project = { id: number; title: string; slug: string };

import type * as CFRichTextTypes from '@contentful/rich-text-types';
import type { Asset, Entry, EntryFields } from 'contentful';

export interface TypePostFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  content: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  excerpt?: EntryFields.Symbol;
  coverImage: Asset;
  date: EntryFields.Date;
}

export type TypePost = Entry<TypePostFields>;

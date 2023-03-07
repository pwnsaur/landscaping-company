import type * as CFRichTextTypes from '@contentful/rich-text-types';
import type { Asset, Entry, EntryFields } from 'contentful';

export interface TypeProjectFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  content: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  excerpt?: EntryFields.Symbol;
  coverImage: Asset;
  date: EntryFields.Date;
}

export type TypeProject = Entry<TypeProjectFields>;

export interface TypeServiceFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  description: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  coverImage: Asset;
}

export type TypeService = Entry<TypeServiceFields>;

export type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

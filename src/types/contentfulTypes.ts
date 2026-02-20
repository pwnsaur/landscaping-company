import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';


export interface TypeProjectFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
  excerpt?: EntryFieldTypes.Symbol;
  coverImage: EntryFieldTypes.AssetLink;
  date: EntryFieldTypes.Date;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, 'project'>;
export type TypeProject = Entry<TypeProjectSkeleton, undefined>;

export interface TypeServiceFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.RichText;
  excerpt?: EntryFieldTypes.Symbol;
  coverImage: EntryFieldTypes.AssetLink;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, 'service'>;
export type TypeService = Entry<TypeServiceSkeleton, undefined>;

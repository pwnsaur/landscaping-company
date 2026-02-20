import { getContentfulClient } from '@/lib/contentfulClient';
import { TypeProject, TypeProjectFields, TypeService, TypeServiceFields } from '@/types/contentfulTypes';

export const getServices = async (): Promise<TypeService[]> => {
  try {
    const client = getContentfulClient();
    const { items } = await client.getEntries<TypeServiceFields>({
      content_type: 'service',
    });
    return items as TypeService[];
  } catch (error) {
    console.error('[contentful] Failed to fetch services', error);
    return [];
  }
};

export const getProjects = async (): Promise<TypeProject[]> => {
  try {
    const client = getContentfulClient();
    const { items } = await client.getEntries<TypeProjectFields>({
      content_type: 'project',
    });
    return items as TypeProject[];
  } catch (error) {
    console.error('[contentful] Failed to fetch projects', error);
    return [];
  }
};

export const getServiceBySlug = async (
  slug: string
): Promise<TypeService | null> => {
  try {
    const client = getContentfulClient();
    const { items } = await client.getEntries<TypeServiceFields>({
      content_type: 'service',
      'fields.slug': slug,
      limit: 1,
    });
    return (items[0] as TypeService) || null;
  } catch (error) {
    console.error('[contentful] Failed to fetch service by slug', error);
    return null;
  }
};

export const getProjectBySlug = async (
  slug: string
): Promise<TypeProject | null> => {
  try {
    const client = getContentfulClient();
    const { items } = await client.getEntries<TypeProjectFields>({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    });
    return (items[0] as TypeProject) || null;
  } catch (error) {
    console.error('[contentful] Failed to fetch project by slug', error);
    return null;
  }
};

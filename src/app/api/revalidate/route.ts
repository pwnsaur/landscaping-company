import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidatePayload = {
  path?: string;
  sys?: {
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: {
    slug?: string | Record<string, string | undefined>;
  };
};

type SlugField = NonNullable<RevalidatePayload['fields']>['slug'];

const DEFAULT_PATHS = ['/', '/services', '/projects', '/about', '/contacts'];

const normalizePath = (path: string): string => {
  if (!path) {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

const getSlugValue = (slugField: SlugField): string | null => {
  if (!slugField) {
    return null;
  }

  if (typeof slugField === 'string') {
    return slugField;
  }

  const localeMatch = Object.values(slugField).find(
    (value): value is string => typeof value === 'string' && value.length > 0
  );

  return localeMatch || null;
};

const revalidateDefaultPaths = (revalidated: Set<string>) => {
  for (const path of DEFAULT_PATHS) {
    revalidatePath(path);
    revalidated.add(path);
  }
};

export const runtime = 'nodejs';

export const POST = async (request: NextRequest) => {
  const secret =
    request.nextUrl.searchParams.get('secret') ||
    request.headers.get('x-revalidate-secret');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 });
  }

  let payload: RevalidatePayload = {};
  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    payload = {};
  }

  const revalidated = new Set<string>();
  const directPath =
    typeof payload.path === 'string' && payload.path.length > 0
      ? normalizePath(payload.path)
      : null;

  if (directPath) {
    revalidatePath(directPath);
    revalidated.add(directPath);
  } else {
    const contentTypeId = payload.sys?.contentType?.sys?.id;
    const slug = getSlugValue(payload.fields?.slug);

    if (contentTypeId === 'service') {
      revalidatePath('/services');
      revalidated.add('/services');
      if (slug) {
        const path = normalizePath(`/services/${slug}`);
        revalidatePath(path);
        revalidated.add(path);
      }
    } else if (contentTypeId === 'project') {
      revalidatePath('/projects');
      revalidated.add('/projects');
      if (slug) {
        const path = normalizePath(`/projects/${slug}`);
        revalidatePath(path);
        revalidated.add(path);
      }
    } else {
      revalidateDefaultPaths(revalidated);
    }
  }

  revalidatePath('/');
  revalidated.add('/');

  return NextResponse.json({
    ok: true,
    revalidated: Array.from(revalidated),
    timestamp: Date.now(),
  });
};

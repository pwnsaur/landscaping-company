import type { Asset, AssetFile, UnresolvedLink } from 'contentful';

type AssetLinkValue = Asset | UnresolvedLink<'Asset'> | undefined;

type AssetImageDetails = {
  width: number;
  height: number;
};

export type AssetImageData = {
  src: string;
  width: number;
  height: number;
};

const hasImageDetails = (
  details: unknown
): details is { image: AssetImageDetails } => {
  if (!details || typeof details !== 'object' || !('image' in details)) {
    return false;
  }

  const image = (details as { image?: unknown }).image;
  return (
    !!image &&
    typeof image === 'object' &&
    'width' in image &&
    'height' in image &&
    typeof (image as { width?: unknown }).width === 'number' &&
    typeof (image as { height?: unknown }).height === 'number'
  );
};

export const isResolvedAsset = (asset: AssetLinkValue): asset is Asset => {
  return !!asset && 'fields' in asset;
};

export const getResolvedAssets = (
  assets: Array<AssetLinkValue> | undefined
): Asset[] => {
  return (assets ?? []).filter(isResolvedAsset);
};

export const getAssetImageData = (asset: AssetLinkValue): AssetImageData | null => {
  if (!isResolvedAsset(asset)) {
    return null;
  }

  const fileField = asset.fields.file;
  const file = getAssetFile(fileField);
  if (!file?.url || !hasImageDetails(file.details)) {
    return null;
  }

  return {
    src: `https:${file.url}`,
    width: file.details.image.width,
    height: file.details.image.height,
  };
};

const isAssetFile = (value: unknown): value is AssetFile => {
  return (
    !!value &&
    typeof value === 'object' &&
    'url' in value &&
    typeof (value as { url?: unknown }).url === 'string' &&
    'details' in value
  );
};

const getAssetFile = (value: unknown): AssetFile | undefined => {
  if (isAssetFile(value)) {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return undefined;
  }

  for (const localeValue of Object.values(value)) {
    if (isAssetFile(localeValue)) {
      return localeValue;
    }
  }

  return undefined;
};

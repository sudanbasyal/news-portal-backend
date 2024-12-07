import config from "../config";

const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${config.apiUrl}/public${encodeURI(normalizedPath)}`;
};

export default getImageUrl;

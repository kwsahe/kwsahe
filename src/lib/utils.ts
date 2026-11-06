export const BASE_PATH = "/kwsahe";

export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const normalized = path.replace(/^\.\//, "/").startsWith("/")
    ? path.replace(/^\.\//, "/")
    : `/${path}`;
  if (normalized.startsWith(`${BASE_PATH}/`)) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

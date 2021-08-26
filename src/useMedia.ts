const mediaMap = new Map<string, MediaQueryList>();

export const useMedia = (query: string): MediaQueryList => {
  const instance = mediaMap.get(query);

  if (instance !== undefined) {
    return instance;
  }

  const media = window.matchMedia(query);

  mediaMap.set(query, media);

  return media;
};

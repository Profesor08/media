const mediaMap = new Map<string, MediaQueryList>();

export const getMedia = (query: string): MediaQueryList => {
  const instance = mediaMap.get(query);

  if (instance !== undefined) {
    return instance;
  }

  const media = window.matchMedia(query);

  if (media.addEventListener === undefined) {
    media.addEventListener = <K extends keyof MediaQueryListEventMap>(
      event: K,
      listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions,
    ) => {
      return media.addListener(listener);
    };
  }

  if (media.removeEventListener === undefined) {
    media.removeEventListener = <K extends keyof MediaQueryListEventMap>(
      event: K,
      listener: (
        this: MediaQueryList,
        ev: MediaQueryListEventMap[K],
        options?: boolean | EventListenerOptions,
      ) => void,
    ) => {
      return media.removeListener(listener);
    };
  }

  mediaMap.set(query, media);

  return media;
};
